import Image from "next/image";
export interface INotFoundPageProps {}

export default function NotFoundPage(props: INotFoundPageProps) {
  return (
    <div className="w-full mt-[30px] h-screen bg-black relative">
      <Image layout="fill" alt="" src="/images/page-not-found.webp" />
    </div>
  );
}
