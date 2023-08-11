import { Posts } from '../common/types-and-interfaces';
import { Post, PostModel } from '../models';
import { Types } from 'mongoose';
import { HttpError } from '../common/errors';

export class PostService {
  async addPost(
    userId: number,
    topic: string = '',
    text: string = '',
  ): Promise<Post> {
    return PostModel.create({ userId, topic, text });
  }

  async editPost(
    postId: string,
    topic: string,
    text: string,
  ): Promise<Post | null> {
    const post = await PostModel.findOne({ _id: new Types.ObjectId(postId) });
    if (!post) {
      throw new HttpError(404, 'Post Not Found', 'Edit Post');
    }

    await PostModel.updateOne(
      { _id: new Types.ObjectId(postId) },
      { $set: { topic: topic, text: text } },
    );

    return post;
  }

  async showPosts(userId: string, take: number, skip: number): Promise<Posts> {
    const posts = await PostModel.find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(take);

    return {
      total: posts.length,
      data: posts,
    };
  }

  async deletePost(postId: string): Promise<void> {
    const post = await PostModel.findOne({ _id: new Types.ObjectId(postId) });
    if (!post) {
      throw new HttpError(404, 'Post Not Found', 'Delete Post');
    }

    await PostModel.deleteOne({ _id: new Types.ObjectId(postId) });
    console.log('post deleted');
  }
}

export const postService = new PostService();
