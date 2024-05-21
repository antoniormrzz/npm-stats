import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>
          Made by{" "}
          <Link href="/user/antoniormrzz?period=last-month">
            Antonio Ramirez
          </Link>
        </p>
      </aside>
    </footer>
  );
}
