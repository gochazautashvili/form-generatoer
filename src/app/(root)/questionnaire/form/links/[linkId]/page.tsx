import Image from "next/image";
import { getQrCode } from "./actions";

interface Props {
  params: { linkId: string };
}

const QrCodePage = async ({ params: { linkId } }: Props) => {
  const qrCode = await getQrCode(linkId);

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <Image src={qrCode} alt="link qrCode" width={500} height={500} />
    </main>
  );
};

export default QrCodePage;
