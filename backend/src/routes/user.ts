import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import { signupInput } from "mk-mediumapp-common/dist";
import { signinInput } from "mk-mediumapp-common/dist";

const userRouter = new Hono();

userRouter.post('/signup', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: c.env?.DATABASE_URL as string,
                },
            },
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const { success } = signupInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "invalid input" });
        }
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name,
                userDescription: body.userDescription,
            },
        });
        const jwtstring = c.env?.JWT_SECRET as string;
        const jwt = await sign(user.id, jwtstring);
        return c.json({ jwt, name: user.name }); // Include user's name in the response
    } catch (error) {
        console.error('Error signing JWT:', error);
        c.status(403);
        return c.json({ error: 'Error while signing up ' + error });
    }
});

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env?.DATABASE_URL as string,
            },
        },
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            c.status(403);
            return c.json({ error: 'User not found' });
        }

        // Assuming you have a function to verify passwords
        const isPasswordValid = await verifyPassword(body.password, user.password);

        if (!isPasswordValid) {
            c.status(403);
            return c.json({ error: 'Invalid password' });
        }
        const jwtstring = c.env?.JWT_SECRET as string;
        const jwt = await sign({ id: user.id }, jwtstring);
        return c.json({ jwt, name: user.name }); // Include user's name in the response
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });

    }
});

// Function to verify password hash
async function verifyPassword(plainPassword: string, hashedPassword: string) {
    // Implement your password verification logic here
    // Compare plainPassword with hashedPassword and return true if they match, false otherwise
    if (plainPassword === hashedPassword) {
        return true
    }
    else {
        return false
    }
}

export default userRouter;
