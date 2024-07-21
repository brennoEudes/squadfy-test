import React from "react";

export default function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; url: string }[];
}) {

  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
