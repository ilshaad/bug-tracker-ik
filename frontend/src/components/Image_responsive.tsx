// responsive image component with react-bootstrap

import React from "react";
import { Image } from "react-bootstrap";

import BugLogo from "../public/images/Bug-Tracker.png";

// you would insert the image within img... props
type Props = {
  imageSrc: any;
  img767?: any;
  img991?: any;
  img1199?: any;
  img1399?: any;
  altString: string;
};

export default function Image_responsive({
  imageSrc,
  img767,
  img991,
  img1199,
  img1399,
  altString,
}: Props) {
  return (
    <picture>
      {/* <source media="(min-width: 1400px)" srcSet="img_pink_flowers.jpg" /> */}
      <source media="(min-width: 1200px)" srcSet={img1399} />
      <source media="(min-width: 992px)" srcSet={img1199} />
      <source media="(min-width: 768px)" srcSet={img991} />
      <source media="(min-width: 576px)" srcSet={img767} />
      {/* <img src={imageSrc} alt="BugLogo" style={{ width: "50px" }} /> */}
      <Image src={imageSrc} alt={altString} rounded className="w-100" />
    </picture>
  );
}
