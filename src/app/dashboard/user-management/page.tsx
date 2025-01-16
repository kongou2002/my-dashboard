import { getAllUsers } from "@/lib/axios/user-service";
import UserDashboard from "./components/user-table";
import { User, UserStatus } from "./type";

export default async function Page() {
  const userList = await getAllUsers();
  const users: User[] = (userList || []).map((user) => {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      image: user.image,
      date_joined: user.date_joined,
      is_active: user.is_active,
      status: user.status as UserStatus,
      is_staff: user.is_staff,
    };
  });

  return (
    <div>
      <UserDashboard userList={users} />
    </div>
  );
}
