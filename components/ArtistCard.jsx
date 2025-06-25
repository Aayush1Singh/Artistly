// Displays a card with artist details and a button to request a quote.

export function ArtistCard({ artist }) {
  return (
    <div className="border p-4 rounded-xl space-y-2">
      <h3 className="text-xl font-semibold">{artist.name}</h3>
      <p>{artist.category}</p>
      <p>{artist.location}</p>
      <p>{artist.price}</p>
      <Button variant="outline">Ask for Quote</Button>
    </div>
  );
}
