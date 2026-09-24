import type { Metadata } from "next";
import SettingsForm from "@/components/SettingsForm";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl animate-fade-in">
        <PageHeader eyebrow="Preferences" title="Settings" description="Question source, quiz defaults, hints, gameplay and appearance — saved on this device." />
        <SettingsForm />
      </div>
    </Container>
  );
}
