import { useUserStore } from "@/entities/user/model/store/userStore";
import { FC } from "react";

export const Introduction: FC = () => {
    const user = useUserStore((set) => set.user?.email)

    return <h1>Hello, {user}!</h1>
}