/**
 * Pikachu will attack you with Volt-tackle!
 *
 * @returns react element
 */
export function PikaButton() {
  return (
    <button
      type="button"
      onClick={() => console.log("Pika attacks with Volt-Tackle!")}
    >
      Pikachu say hi!
    </button>
  );
}
