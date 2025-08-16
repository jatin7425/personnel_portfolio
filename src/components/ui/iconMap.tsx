import { JSX } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaStackOverflow,
  FaCodepen,
  FaDribbble,
  FaMedium,
  FaDev,
  FaDiscord,
  FaSlack,
  FaTwitch,
  FaTelegram,
  FaReddit,
} from "react-icons/fa";

import {
  SiLeetcode,
  SiHackerrank,
  SiGmail,
  SiGmail as SiEmail,
  SiSpotify,
} from "react-icons/si";

const iconMap: { [key: string]: JSX.Element } = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedin />,
  Twitter: <FaTwitter />,
  Facebook: <FaFacebook />,
  Instagram: <FaInstagram />,
  YouTube: <FaYoutube />,
  StackOverflow: <FaStackOverflow />,
  CodePen: <FaCodepen />,
  Dribbble: <FaDribbble />,
  Medium: <FaMedium />,
  Dev: <FaDev />,
  Discord: <FaDiscord />,
  Slack: <FaSlack />,
  Twitch: <FaTwitch />,
  Telegram: <FaTelegram />,
  Reddit: <FaReddit />,
  LeetCode: <SiLeetcode />,
  HackerRank: <SiHackerrank />,
  Gmail: <SiGmail />,
  Email: <SiEmail />,
  Spotify: <SiSpotify />,
};

export default iconMap;
