import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import {createPostInput} from "mk-mediumapp-common/dist";
import {updatePostInput} from "mk-mediumapp-common/dist";

const blogRouter = new Hono();

blogRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env?.JWT_SECRET as string);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId' as any, payload.id);
	await next()
})

  
blogRouter.get('/bulk', async (c) => {
    
	const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env?.DATABASE_URL as string,
          },
        },
      }).$extends(withAccelerate());
	
      const posts = await prisma.post.findMany({});
      return c.json({
        posts
    });
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id')
    const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env?.DATABASE_URL as string,
          },
        },
      }).$extends(withAccelerate());

    const post = await prisma.post.findUnique({
        where: {
            id
          }
	    });

	return c.json(post);
  });
  
blogRouter.post('/', async (c) => {

    const userId = c.get('userId' as any);
    const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env?.DATABASE_URL as string,
          },
        },
      }).$extends(withAccelerate());

      const body = await c.req.json();
      const { success } = createPostInput.safeParse(body);
	  if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	  }
      const post = await prisma.post.create({
          data: {
              title: body.title,
              content: body.content,
              authorId: userId
          }
      });
      return c.json({
          id: post.id
      });

})

blogRouter.put('/', async (c) => {
    const userId = c.get('userId' as any);
    const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env?.DATABASE_URL as string,
          },
        },
      }).$extends(withAccelerate());

      const body = await c.req.json();
      const { success } = updatePostInput.safeParse(body);
	  if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	  }
      const updatedpost = await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.json({
        title: updatedpost.title,
        content: updatedpost.content
    
    });
})


export default blogRouter
