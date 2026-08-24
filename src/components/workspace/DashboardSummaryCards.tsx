import Link from "next/link";

type SummaryCard = {
  label: string;
  value: string;
  href: string;
};

type DashboardSummaryCardsProps = {
  cards: SummaryCard[];
};

export function DashboardSummaryCards({ cards }: DashboardSummaryCardsProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <li key={card.label}>
          <Link
            href={card.href}
            className="block rounded-xl border border-border bg-surface-elevated/40 p-5 transition-all duration-300 hover:border-accent/25 hover:bg-surface-elevated/70 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              {card.value}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
