import {connectToDB} from '@utils/database';
import PromptModel from '@models/prompt';
import UserModel from '@models/user';

export const POST = async (request) => {
  const {searchTerm} = await request.json();
  console.log(searchTerm);

  try {
    await connectToDB();
    const userData = await UserModel.find({
      username: {$regex: searchTerm, $options: 'i'},
    });

    const userIds = userData.map((user) => user._id);
    const userPosts = await PromptModel.find({
      creator: {$in: userIds},
    }).populate('creator');

    return new Response(JSON.stringify(userPosts));
  } catch (error) {
    console.log('search error', error);
    return new Response(error);
  }
};
