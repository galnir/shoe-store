import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="bg-red-600 text-white w-fit px-4 py-2 hover:cursor-pointer">
        <h1 className="text-6xl font-bold uppercase">Abibas</h1>
      </div>
    </Link>
  );
};

export default Logo;
