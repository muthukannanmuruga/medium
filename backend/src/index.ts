import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import userRouter from './routes/user';
import blogRouter from './routes/blog';
import { cors } from 'hono/cors'


const app = new Hono();

// Add health check endpoint
app.get('/healthcheck', async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL as string,
      }).$extends(withAccelerate());
      console.log(c.env?.DATABASE_URL)

      // Simple query to verify connection
      await prisma.$queryRaw`SELECT 1`;
      
      return c.json({
        status: 'OK',
        database: 'Connected'
      });
    } catch (error) {
      console.error('Database connection error:', error);
      return c.json({
        status: 'Error',
        database: 'Connection failed'
      }, 500);
    }
  });

app.use('/*', cors())

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)







export default app
