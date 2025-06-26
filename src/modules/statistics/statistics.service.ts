import { Comment } from "../comments/comments.model";
import { Payment } from "../payment/payment.model";
import { Post } from "../post/post.model";
import { User } from "../user/user.model";

const getStatisticsFromDB = async () => {
  try {
    const statistics: {
      totalPayments?: number;
      totalSoldMembershipAmount?: number;
      totalPosts?: number;
      totalUpvotes?: number;
      totalPostComments?: number;
      totalPremiumPosts?: number;
      totalPremiumUsers?: number;
      totalUsers?: number;
    } = {};

    // 1. Total Payments
    const totalPayments = await Payment.countDocuments();
    statistics.totalPayments = totalPayments;

    // 2. Total Sold Membership Amount (sum of 'cost' field in payments)
    const totalSoldMembershipAmount = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalCost: { $sum: "$cost" },
        },
      },
    ]);
    statistics.totalSoldMembershipAmount =
      totalSoldMembershipAmount[0]?.totalCost || 0;

    // 3. Total Posts
    const totalPosts = await Post.countDocuments();
    statistics.totalPosts = totalPosts;

    // 4. Total Post Votes (sum of 'votes' field in posts)
    const totalPostVotes = await Post.aggregate([
      {
        $group: {
          _id: null,
          totalVotes: { $sum: "$votes" },
        },
      },
    ]);
    statistics.totalUpvotes = totalPostVotes[0]?.totalVotes || 0;

    // 5. Total Post Comments (matching posts _id with comments' postId)
    const totalPostComments = await Comment.countDocuments();
    statistics.totalPostComments = totalPostComments;

    // 6. Total Premium Posts (where 'isPremium' is true)
    const totalPremiumPosts = await Post.countDocuments({ isPremium: true });
    statistics.totalPremiumPosts = totalPremiumPosts;

    // 7. Total Users
    const totalUsers = await User.countDocuments();
    statistics.totalUsers = totalUsers;

    // 8. Total Premium Users (where 'memberShip' is not null)
    const totalPremiumUsers = await User.countDocuments({
      memberShip: { $ne: null },
    });
    statistics.totalPremiumUsers = totalPremiumUsers;

    return statistics;
  } catch (error) {
    console.error("Error fetching statistics: ", error);
    throw error;
  }
};

export const statisticsServices = {
  getStatisticsFromDB,
};
