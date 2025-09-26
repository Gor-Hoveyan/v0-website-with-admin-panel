import { createClient } from "@/lib/supabase/server";

export default async function TalksEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  const grouped = events?.reduce((acc, event) => {
    acc[event.category] = [...(acc[event.category] || []), event];
    return acc;
  }, {} as Record<string, typeof events>);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Talks & Events</h1>

      {Object.entries(grouped || {}).map(([category, items]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 capitalize">
            {category}s
          </h2>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="border-b pb-2">
                <h3 className="text-lg font-medium">{item.title}</h3>
                {item.date && (
                  <p className="text-sm text-gray-500">{item.date}</p>
                )}
                {item.location && <p className="text-sm">{item.location}</p>}
                {item.description && <p>{item.description}</p>}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    className="text-blue-600 underline text-sm"
                  >
                    More info
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
