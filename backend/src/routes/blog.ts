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
	
      try {
        const posts = await prisma.post.findMany({
          select: {
            title: true,
            published: true,
            content: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        });
    
        const formattedPosts = posts.map(post => ({
          title: post.title,
          publishedOn: post.published,
          content: post.content,
          authorName: post.author ? post.author.name || 'Anonymous' : 'Anonymous',
        }));
    
        return c.json({
          posts: formattedPosts,
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
        c.status(500);
        return c.json({ error: 'Internal Server Error' });
      } finally {
        await prisma.$disconnect();
      }
    });




    blogRouter.get('/:id', async (c) => {
      const id = c.req.param('id')
      const prisma = new PrismaClient({
          datasources: {
            db: {
              url: c.env?.DATABASE_URL as string,
            },
          },
        }).$extends(withAccelerate());
  
      const posts = await prisma.post.findUnique({
          where: {
              id
            },
  
          select: {
            title: true,
            published: true,
            content: true,
            author: {
              select: {
                name: true,
              },
            },
          }
        });
  
      if (!posts) {
        // Handle the case where no post with the specified ID is found
        c.status(404);
        return c.json({ error: 'Post not found' });
      }
  
      const formattedPost = {
        title: posts.title,
        publishedOn: posts.published,
        content: posts.content,
        authorName: posts.author ? posts.author.name || 'Anonymous' : 'Anonymous',
      };
  
      
    
      return c.json({
        posts: formattedPost
      });
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
      const currentDate = new Date();

      // Format the current date and time
      const formattedDate = formatDate(currentDate);
      const post = await prisma.post.create({
          data: {
              title: body.title,
              content: body.content,
              published: formattedDate,
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
    const currentDate = new Date();

    // Format the current date and time
    const formattedDate = formatDate(currentDate);
    const updatedpost = await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content,
      published: formattedDate
		}
	});

	return c.json({
        title: updatedpost.title,
        content: updatedpost.content,
        published: body.published
    
    });
})

function formatDate(date: Date): string {
  // Get the individual components of the date and time
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Concatenate the components to form the desired format
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


export default blogRouter
