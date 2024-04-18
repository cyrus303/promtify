import {connectToDB} from '@utils/database';
import PromptModel from '@models/prompt';
import UserModel from '@models/user';

export const POST = async (request) => {
  const {searchText} = await request.json();

  try {
    await connectToDB();

    const userQuery = {
      username: {$regex: searchText, $options: 'i'},
    };

    const promptQuery = {
      $or: [
        {tag: {$regex: searchText, $options: 'i'}},
        {prompt: {$regex: searchText, $options: 'i'}},
      ],
    };

    const userData = await UserModel.find(userQuery);
    const userIds = userData.map((user) => user._id);

    const userPosts = await PromptModel.find({
      $or: [{creator: {$in: userIds}}, promptQuery],
    }).populate('creator');

    return new Response(JSON.stringify(userPosts));
  } catch (error) {
    console.log('search error', error);
    return new Response(error);
  }
};
