export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <div className="fixed w-[100%] h-[72px] bg-white">
      <h1 className="mx-[5%] text-pink-500 my-[10px] hover:cursor-pointer hover:opacity-70">
        akinha
      </h1>
    </div>
  );
}
