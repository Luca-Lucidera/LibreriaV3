import { Argon2id } from "oslo/password";

export default eventHandler(async (event) => {
  const { username, password } = await readBody<{ username: string; password: string }>(event, {strict: true})
  if (!isValidUsername(username)) {
    throw createError({
      statusMessage: "Invalid username",
      statusCode: 400,
    });
  }

  if (!isValidPassword(password)) {
    throw createError({
      statusMessage: "Invalid password",
      statusCode: 400,
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      username: username as string,
    },
  });

  if (!user) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    throw createError({
      statusMessage: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const validPassword = await new Argon2id().verify(
    user.password,
    password as string
  );
  if (!validPassword) {
    throw createError({
      statusMessage: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const session = await lucia.createSession(user.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
