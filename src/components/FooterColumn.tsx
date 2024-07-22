import React from "react";

export default function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; url: string }[];
}) {
  return (
    <div className="footer-column flex flex-col gap-4">
      <h4>{title}</h4>
      <ul className="">
        {links.map((link, index) => (
          <li className="mb-4" key={index}>
            <a className="underline underline-offset-4 decoration-quaternary hover:text-blue-700" href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
