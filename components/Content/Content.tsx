import { SafeAreaView } from "react-native-safe-area-context";

interface ContentProps {
  children: any;
}

const Content = ({ children }: ContentProps) => {
  return <SafeAreaView className="flex-1 pt-5 px-3 ">{children}</SafeAreaView>;
};

export default Content;
