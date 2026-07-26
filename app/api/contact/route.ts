import { NextResponse } from "next/server";

const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "serviceInterest",
  "message",
] as const;

function clean(value: unknown, maxLength = 4000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let submitted: Record<string, unknown>;

  try {
    submitted = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(submitted.website)) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    firstName: clean(submitted.firstName, 120),
    lastName: clean(submitted.lastName, 120),
    company: clean(submitted.company, 180),
    email: clean(submitted.email, 240),
    phone: clean(submitted.phone, 80),
    serviceInterest: clean(submitted.serviceInterest, 120),
    projectTiming: clean(submitted.projectTiming, 120),
    facilityLocation: clean(submitted.facilityLocation, 240),
    message: clean(submitted.message),
  };

  const missing = requiredFields.filter((field) => !payload[field]);
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);

  if (missing.length || !emailLooksValid) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { error: "Online request delivery is not configured." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        source: "Data Power Source website",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Request delivery failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Request delivery failed." }, { status: 502 });
  }
}
