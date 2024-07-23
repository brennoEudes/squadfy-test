import Image from "next/image";
import instagramIcon from "../../public/assets/icons/instagram.svg";
import facebookIcon from "../../public/assets/icons/fb-black.svg";
import twitterIcon from "../../public/assets/icons/twitter.svg";

export default function SocialLinks() {
  return (
    <div className="flex gap-6">
      <a href="#" target="_blank" rel="noopener noreferrer">
        <Image src={instagramIcon} alt="Instagram icon" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <Image src={facebookIcon} alt="Facebook icon" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <Image src={twitterIcon} alt="Twitter icon" />
      </a>
    </div>
  );
}
