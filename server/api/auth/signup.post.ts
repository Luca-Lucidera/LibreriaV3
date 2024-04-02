import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

export default eventHandler(async (event) => {
  const formData = await readFormData(event);

  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      statusMessage: "Invalid username",
      statusCode: 400,
    });
  }

  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      statusMessage: "Invalid password",
      statusCode: 400,
    });
  }

  const dateOfBirth = formData.get("dateOfBirth");
  if (!isValidDateOfBirth(dateOfBirth)) {
    throw createError({
      statusMessage: "Invalid dateOfBirth",
      statusCode: 400,
    });
  }

  const isOver18 = !IsOver18(dateOfBirth as string);

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  await prisma.user.create({
    data: {
      id: userId,
      username,
      password: hashedPassword,
      dateOfBirth: dateOfBirth as string,
      isOver18,
    },
  });

  const session = await lucia.createSession(userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
