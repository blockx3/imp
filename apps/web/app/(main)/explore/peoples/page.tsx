import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PG_PRISMA_CLIENT } from "@repo/database";
import { auth } from "@/auth";
import FollowAction from "./FollowAction";
import { mongo_client } from "@/lib/mongodb";
async function ExplorePeoples() {
  const session = await auth();
  const peoples = await PG_PRISMA_CLIENT.user.findMany({
    where: {
      NOT: {
        email: session?.user?.email as string,
      },
    },
  });
  // TODO: improve the logic
  const CurrentUser = await PG_PRISMA_CLIENT.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  if (!CurrentUser?.following_data_id || !CurrentUser?.followers_data_id) {
    mongo_client
      .db("follow_data")
      .createCollection((CurrentUser?.id + "followers") as string);
    mongo_client
      .db("follow_data")
      .createCollection((CurrentUser?.id + "following") as string);
    await PG_PRISMA_CLIENT.user.update({
      where: {
        id: CurrentUser?.id as string,
      },
      data: {
        followers_data_id: (CurrentUser?.id + "followers") as string,
        following_data_id: (CurrentUser?.id + "following") as string,
      },
    });
  }
  const user_following = mongo_client
    .db("follow_data")
    .collection(CurrentUser?.id + "following")
    .find();

  return (
    <div>
      <div className="">
        <Input
          type="text"
          placeholder="Search Peoples..."
          className="max-w-lg mx-auto my-6"
        />
      </div>
      <div>
        <div className="container mx-auto py-10 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {peoples.map(async (user) => {
              // TODO improve the logic
              let isFollowing = false;
              (await user_following.toArray()).map((element) => {
                if (!isFollowing) {
                  if (element.email === user.email) {
                    isFollowing = true;
                  } else {
                    isFollowing = false;
                  }
                }
              });

              return (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12 border shrink-0">
                          <AvatarImage src={user.image as string} alt={""} />
                          <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate">
                            {user.name}
                          </h3>
                          <div className="flex items-center flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {user.followers} followers
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {"@usern"}
                            </p>
                          </div>
                          <p className="text-sm font-medium">{"SDE"}</p>
                        </div>
                      </div>
                      <div className="flex items-center self-start mt-2 sm:mt-0">
                        <FollowAction
                          isFollowing={isFollowing}
                          toFollowUserId={user.id}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePeoples;
