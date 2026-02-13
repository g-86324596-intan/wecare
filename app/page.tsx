import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Wecare</h1>
      <p>Authentication scaffold is ready.</p>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/group">Group Area (protected)</Link>
        </li>
        <li>
          <Link href="/admin">Admin Area (protected)</Link>
        </li>
      </ul>
    </main>
  );
}
