create table if not exists profiles (
  user_id text primary key,
  credits integer not null default 120,
  preferred_model text not null default 'grok-4.7',
  preferred_voice text not null default 'eve',
  created_at timestamptz not null default now()
);

create table if not exists conversations (
  id text primary key,
  user_id text not null,
  kind text not null,
  title text not null,
  model text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists conversations_user_idx on conversations (user_id, kind, updated_at);

create table if not exists messages (
  id text primary key,
  conversation_id text not null,
  user_id text not null,
  role text not null,
  content text not null,
  model text,
  created_at timestamptz not null default now()
);
create index if not exists messages_conv_idx on messages (conversation_id, created_at);

create table if not exists generations (
  id text primary key,
  user_id text not null,
  kind text not null,
  model text not null,
  prompt text not null,
  status text not null,
  result_url text,
  result_text text,
  credit_cost integer not null,
  created_at timestamptz not null default now()
);
create index if not exists generations_user_idx on generations (user_id, kind, created_at);

create table if not exists credit_ledger (
  id text primary key,
  user_id text not null,
  delta integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);
create index if not exists credit_ledger_user_idx on credit_ledger (user_id, created_at);
