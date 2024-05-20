import { testIDs } from "~/tests/testIDs";
import { Text } from "~/components";
import type { BaseComponentProps } from "~/types";
import { formatDate } from "~/lib/dates/date";

type UserInfoProps = BaseComponentProps & {
  name: string;
  publishedAt: Date;
};

function UserInfo({ name, publishedAt }: UserInfoProps) {
  const formatedDate = formatDate(publishedAt);
  return (
    <div className="w-full rounded-lg flex flex-col gap-2">
      <Text
        variant={"p"}
        className="capitalize text-xl font-medium"
        data-testid={testIDs?.userInfo?.name ?? ""}
      >
        {name}
      </Text>
      <Text
        variant={"p"}
        className="capitalize text-xl font-light"
        data-testid={testIDs?.userInfo?.date ?? ""}
      >
        {formatedDate}
      </Text>
    </div>
  );
}

export default UserInfo;
