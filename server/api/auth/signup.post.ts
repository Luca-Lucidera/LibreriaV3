import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

type Data = {
  username: string;
  password: string;
  dateOfBirth: Date;
};

export default eventHandler(async (event) => {
  const { username, dateOfBirth, password } = await readBody<Data>(event, {
    strict: true,
  });

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

  const isOver18 = IsOver18(dateOfBirth);

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  await prisma.user.create({
    data: {
      id: userId,
      username,
      password: hashedPassword,
      dateOfBirth: dateOfBirth,
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
