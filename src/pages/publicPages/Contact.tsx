
import PublicPageHero from "@/components/marketing/PublicPageHero";
import PageTransition from "@/components/shared/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    toast.success("Message sent! Our team will get back to you within 24 hours.");
    form.reset();
  };

  return (
    <PageTransition>
      <PublicPageHero
        badge="Contact Us"
        title="We'd love to"
        highlight="hear from you"
        description="Questions about WalletIQ? Reach out and our team will respond promptly."
      />

      <section className="mx-auto w-11/12 max-w-7xl py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-3xl border bg-card p-8 shadow-sm"
          >
            <h2 className="text-xl font-bold">Send us a message</h2>
            <FieldGroup className="mt-6 space-y-4">
              <Field>
                <FieldLabel>Full name</FieldLabel>
                <Input className="h-11" {...form.register("name")} />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" className="h-11" {...form.register("email")} />
              </Field>
              <Field>
                <FieldLabel>Subject</FieldLabel>
                <Input className="h-11" {...form.register("subject")} />
              </Field>
              <Field>
                <FieldLabel>Message</FieldLabel>
                <Textarea rows={5} {...form.register("message")} />
              </Field>
            </FieldGroup>
            <Button type="submit" className="mt-6 h-11 w-full rounded-2xl">
              Send Message
            </Button>
          </form>

          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: "Email",
                value: "support@walletiq.com",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+880 1234-567890",
              },
              {
                icon: MapPin,
                title: "Office",
                value: "Dhaka, Bangladesh",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-3xl border bg-card p-6 shadow-sm"
              >
                <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-500">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
