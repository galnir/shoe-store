import Image from "next/image";
import Link from "next/link";
import formatMoney from "../../lib/formatMoney";

const Product = ({ product }: { product: any }) => {
  console.log(product);
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border w-fit">
        <div className="relative w-[400px] h-[400px] text-white">
          <div className="absolute top-0 right-0 font-bold bg-red-600 z-10 p-2 text-2xl">
            {formatMoney(product.price)}
          </div>
          <Image
            src={product?.photo?.image?.publicUrlTransformed}
            height={400}
            width={400}
            objectFit="cover"
          />
          <div className="absolute w-fit -bottom-2 left-0 right-0 m-auto bg-red-600 text-3xl p-2">
            {product.name}
          </div>
        </div>
        <p className="mt-2">{product.description}</p>
      </div>
    </Link>
  );
};

export default Product;
