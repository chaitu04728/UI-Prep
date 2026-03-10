import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "State Management | Next.js Explorer",
  description: "Complete state management guide: Context + useReducer, Zustand, Redux Toolkit, Jotai, React Query, and best practices.",
};

interface Concept {
  id: string;
  category: string;
  badgeClass: string;
  title: string;
  desc: string;
  code: string;
  note: string;
}

const concepts: Concept[] = [
  // ─── PATTERNS ──────────────────────────────────────────────────────────────
  {
    id: "lifting-state",
    category: "Patterns",
    badgeClass: "badge-orange",
    title: "Lifting State Up",
    desc: "When multiple components need shared state, lift it to their closest common ancestor. Pass state down as props, callbacks up. Simple and effective for small component trees.",
    code: `// ❌ Before: Duplicated state in siblings
function SearchInput() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

function SearchResults() {
  const [query, setQuery] = useState('');  // Same state, out of sync!
  return <div>Results for: {query}</div>;
}

// ✅ After: Lift state to parent
function SearchPage() {
  const [query, setQuery] = useState('');  // Single source of truth
  
  return (
    <>
      <SearchInput value={query} onChange={setQuery} />
      <SearchResults query={query} />
    </>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

function SearchResults({ query }: { query: string }) {
  return <div>Results for: {query}</div>;
}

// When to lift state:
// ✅ 2-3 components need same data
// ✅ Parent-child or sibling relationships
// ✅ Simple state (strings, booleans, numbers)
// ❌ Deep nesting (causes prop drilling)
// ❌ Many distant components need the state
// ❌ Complex state logic (use reducer or context)

// Pattern: Lift to common ancestor, pass down
function App() {
  const [user, setUser] = useState(null);
  
  return (
    <>
      <Header user={user} />
      <Sidebar user={user} />
      <Content user={user} onLogout={() => setUser(null)} />
    </>
  );
}`,
    note: "Lifting state is React's most basic pattern. It's perfect for local, related components. If you're passing props through 3+ levels, consider Context. If state logic is complex, consider useReducer.",
  },
  {
    id: "context-reducer",
    category: "Patterns",
    badgeClass: "badge-orange",
    title: "Context + useReducer Pattern",
    desc: "Combine Context (no prop drilling) with useReducer (complex state logic). This pattern scales well for app-level state without external libraries. Separate state and dispatch contexts for optimization.",
    code: `// ─── DEFINE STATE & ACTIONS ────────────────────────────────
type State = {
  user: User | null;
  cart: CartItem[];
  theme: 'light' | 'dark';
};

type Action =
  | { type: 'LOGIN'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_CART'; item: CartItem }
  | { type: 'REMOVE_FROM_CART'; id: string }
  | { type: 'TOGGLE_THEME' };

// ─── REDUCER ───────────────────────────────────────────────
function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user };
    case 'LOGOUT':
      return { ...state, user: null, cart: [] };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.item] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.id) };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

// ─── CONTEXT SETUP ─────────────────────────────────────────
const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

// Provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    cart: [],
    theme: 'light',
  });
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Custom hooks for easy access
export function useAppState() {
  const context = useContext(StateContext);
  if (!context) throw new Error('useAppState must be inside AppProvider');
  return context;
}

export function useAppDispatch() {
  const context = useContext(DispatchContext);
  if (!context) throw new Error('useAppDispatch must be inside AppProvider');
  return context;
}

// ─── USAGE ─────────────────────────────────────────────────
function UserProfile() {
  const { user } = useAppState();
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={() => dispatch({ type: 'LOGOUT' })}>
        Logout
      </button>
    </div>
  );
}

function Cart() {
  const { cart } = useAppState();
  const dispatch = useAppDispatch();
  
  return (
    <div>
      {cart.map(item => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── OPTIMIZATION: Separate contexts prevents re-renders ──
// Components using only dispatch don't re-render on state changes!

function AddToCartButton({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();  // No state → no re-render
  
  return (
    <button onClick={() => dispatch({ type: 'ADD_TO_CART', item })}>
      Add to Cart
    </button>
  );
}`,
    note: "Context + useReducer is React's built-in state management. Separate state/dispatch contexts = performance boost. Pattern scales to medium apps. For larger apps or DevTools, consider Zustand or Redux.",
  },
  {
    id: "server-client-state",
    category: "Patterns",
    badgeClass: "badge-orange",
    title: "Server State vs Client State",
    desc: "Server state is data from external sources (APIs, databases). Client state is UI-only (modals, form inputs). Never mix them! Server state needs: caching, revalidation, background updates. Client state is ephemeral.",
    code: `// ─── CLIENT STATE (UI-only, local) ────────────────────────
// ✅ Use useState, useReducer, Context

function SearchPage() {
  // UI state
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [filters, setFilters] = useState({ category: 'all' });
  
  return (
    <>
      <button onClick={() => setModalOpen(true)}>Open</button>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="date">Date</option>
        <option value="name">Name</option>
      </select>
    </>
  );
}

// ─── SERVER STATE (remote data) ────────────────────────────
// ❌ DON'T use useState + useEffect for server data

function BadUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);
  
  // Problems:
  // - No caching (re-fetch on every mount)
  // - Race conditions (multiple fetches)
  // - No error handling
  // - No background updates
  // - Manual loading state
  
  if (loading) return <div>Loading...</div>;
  return <div>{users.map(...)}</div>;
}

// ✅ DO use React Query / TanStack Query

import { useQuery } from '@tanstack/react-query';

function GoodUserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
  
  // Features:
  // ✅ Automatic caching
  // ✅ Background refetching
  // ✅ Deduplication
  // ✅ Error handling
  // ✅ Loading states
  // ✅ Optimistic updates
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return <div>{users.map(...)}</div>;
}

// ─── MUTATIONS (updating server state) ────────────────────
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateUserForm() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newUser: User) => 
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      }).then(r => r.json()),
    
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      mutation.mutate({ name: 'John' });
    }}>
      <button disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}

// ─── NEXT.JS SERVER COMPONENTS (best for server state) ────
// No loading state, no useEffect, direct data access

async function UserList() {
  const users = await db.user.findMany();  // runs on server
  return <div>{users.map(user => <div key={user.id}>{user.name}</div>)}</div>;
}

// Client state still uses hooks
function UserListWithFilters() {
  const [sortBy, setSortBy] = useState('name');  // UI state
  
  return (
    <>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="name">Name</option>
      </select>
      <UserList sortBy={sortBy} />
    </>
  );
}`,
    note: "Mixing server and client state is a common React mistake. Client state: forms, modals, UI toggles. Server state: user data, posts, API responses. React Query handles server state best. Next.js Server Components eliminate the need for client-side fetching.",
  },

  // ─── LIBRARIES ─────────────────────────────────────────────────────────────
  {
    id: "zustand",
    category: "Libraries",
    badgeClass: "badge-purple",
    title: "Zustand",
    desc: "Zustand is a minimal state management library. No boilerplate, no providers, built-in selectors. Perfect for apps that don't need Redux complexity.",
    code: `// Install: npm install zustand

// ─── CREATE STORE ──────────────────────────────────────────
import { create } from 'zustand';

interface BearState {
  bears: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  decrease: () => set((state) => ({ bears: state.bears - 1 })),
  reset: () => set({ bears: 0 }),
}));

// ─── USE IN COMPONENTS ─────────────────────────────────────
function BearCounter() {
  const bears = useBearStore((state) => state.bears);  // Selector
  return <h1>{bears} bears</h1>;
}

function Controls() {
  const increase = useBearStore((state) => state.increase);
  const decrease = useBearStore((state) => state.decrease);
  
  return (
    <>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </>
  );
}
// No provider needed! Each component subscribes directly

// ─── ASYNC ACTIONS ─────────────────────────────────────────
interface UserState {
  user: User | null;
  loading: boolean;
  fetchUser: (id: string) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  
  fetchUser: async (id) => {
    set({ loading: true });
    const user = await fetch(\`/api/users/\${id}\`).then(r => r.json());
    set({ user, loading: false });
  },
}));

// Usage
function UserProfile({ id }: { id: string }) {
  const { user, loading, fetchUser } = useUserStore();
  
  useEffect(() => {
    fetchUser(id);
  }, [id, fetchUser]);
  
  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}

// ─── SLICES (organize large stores) ────────────────────────
const createUserSlice = (set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
});

const createCartSlice = (set) => ({
  cart: [],
  addItem: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeItem: (id) => set((state) => ({ 
    cart: state.cart.filter(i => i.id !== id) 
  })),
});

const useStore = create((set) => ({
  ...createUserSlice(set),
  ...createCartSlice(set),
}));

// ─── PERSIST (save to localStorage) ────────────────────────
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-storage',  // localStorage key
    }
  )
);

// ─── DEVTOOLS ──────────────────────────────────────────────
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
    bears: 0,
    increase: () => set((state) => ({ bears: state.bears + 1 })),
  }))
);`,
    note: "Zustand is simpler than Redux but more powerful than Context. No providers = no context performance issues. Built-in TypeScript support. Use for medium-to-large apps. Pairs well with React Query for server state.",
  },
  {
    id: "redux-toolkit",
    category: "Libraries",
    badgeClass: "badge-purple",
    title: "Redux Toolkit",
    desc: "Redux Toolkit (RTK) is the modern Redux. Includes slices, immer (mutations), thunks, and RTK Query. Massive ecosystem, DevTools, time-travel debugging. Use for large, complex apps.",
    code: `// Install: npm install @reduxjs/toolkit react-redux

// ─── CREATE SLICE ──────────────────────────────────────────
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 } as CounterState,
  reducers: {
    increment: (state) => {
      state.value += 1;  // Immer makes this safe (mutates draft)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

// ─── CONFIGURE STORE ───────────────────────────────────────
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ─── PROVIDER ──────────────────────────────────────────────
import { Provider } from 'react-redux';

<Provider store={store}>
  <App />
</Provider>

// ─── USE IN COMPONENTS ─────────────────────────────────────
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';
import type { RootState } from './store';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
    </div>
  );
}

// ─── ASYNC THUNKS ──────────────────────────────────────────
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Usage
function UserProfile({ id }: { id: string }) {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    dispatch(fetchUser(id));
  }, [id, dispatch]);
  
  if (status === 'loading') return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}

// ─── SELECTORS (reselect) ──────────────────────────────────
import { createSelector } from '@reduxjs/toolkit';

const selectCart = (state: RootState) => state.cart.items;

// Memoized selector — only recomputes when cart changes
export const selectCartTotal = createSelector(
  [selectCart],
  (items) => items.reduce((sum, item) => sum + item.price * item.qty, 0)
);

// Usage
const total = useSelector(selectCartTotal);`,
    note: "Redux Toolkit eliminates Redux boilerplate. Use for: large teams, complex state, time-travel debugging, middleware needs. For smaller apps, Zustand is simpler. RTK Query is an alternative to React Query.",
  },
  {
    id: "jotai-recoil",
    category: "Libraries",
    badgeClass: "badge-purple",
    title: "Jotai / Recoil (Atom Model)",
    desc: "Atom-based state management: state is split into small, independent atoms. Components subscribe to only the atoms they use. Bottom-up approach vs Redux's top-down.",
    code: `// ─── JOTAI ─────────────────────────────────────────────────
// Install: npm install jotai

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

// Define atoms (units of state)
const countAtom = atom(0);
const nameAtom = atom('John');

// Derived atoms
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Usage
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </>
  );
}

function DoubleCounter() {
  const doubleCount = useAtomValue(doubleCountAtom);  // read-only
  return <h2>Double: {doubleCount}</h2>;
}
// Only re-renders when doubleCountAtom changes!

// Async atoms
const userAtom = atom(async () => {
  const response = await fetch('/api/user');
  return response.json();
});

function UserProfile() {
  const user = useAtomValue(userAtom);  // Suspends until resolved
  return <div>{user.name}</div>;
}

// Wrap in Suspense
<Suspense fallback={<Loading />}>
  <UserProfile />
</Suspense>

// Write-only atom (action)
const incrementAtom = atom(
  null,  // no read
  (get, set) => {
    set(countAtom, get(countAtom) + 1);
  }
);

function IncrementButton() {
  const increment = useSetAtom(incrementAtom);
  return <button onClick={increment}>+1</button>;
}

// ─── RECOIL ────────────────────────────────────────────────
// Install: npm install recoil

import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// Atoms
const countState = atom({
  key: 'count',  // unique ID
  default: 0,
});

const nameState = atom({
  key: 'name',
  default: 'John',
});

// Selectors (derived state)
const doubleCountState = selector({
  key: 'doubleCount',
  get: ({ get }) => {
    const count = get(countState);
    return count * 2;
  },
});

// Provider required
import { RecoilRoot } from 'recoil';

<RecoilRoot>
  <App />
</RecoilRoot>

// Usage
function Counter() {
  const [count, setCount] = useRecoilState(countState);
  
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </>
  );
}

function DoubleCounter() {
  const doubleCount = useRecoilValue(doubleCountState);
  return <h2>Double: {doubleCount}</h2>;
}

// Async selectors
const userQuery = selector({
  key: 'userQuery',
  get: async () => {
    const response = await fetch('/api/user');
    return response.json();
  },
});

// ─── COMPARISON ────────────────────────────────────────────
// Jotai:
// ✅ Simpler API, less boilerplate
// ✅ No provider (or optional provider for resetting state)
// ✅ TypeScript-first
// ✅ Smaller bundle (~3KB)

// Recoil:
// ✅ More features (atom families, selectors with params)
// ✅ Built by Facebook/Meta
// ✅ DevTools
// ❌ Requires provider
// ❌ Larger bundle (~14KB)`,
    note: "Atom model is great for granular subscriptions — components only re-render when their atoms change. Simpler than Redux for many use cases. Jotai is more modern/minimal, Recoil has more features. Both support async state natively.",
  },
  {
    id: "react-query",
    category: "Libraries",
    badgeClass: "badge-purple",
    title: "React Query / TanStack Query",
    desc: "React Query is the best solution for server state: caching, background refetching, stale-while-revalidate, optimistic updates, infinite scroll. Not for client state!",
    code: `// Install: npm install @tanstack/react-query

// ─── SETUP ─────────────────────────────────────────────────
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 minutes
      cacheTime: 10 * 60 * 1000,  // 10 minutes
      refetchOnWindowFocus: true,
    },
  },
});

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>

// ─── BASIC QUERY ───────────────────────────────────────────
import { useQuery } from '@tanstack/react-query';

function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(r => r.json()),
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// ─── QUERY WITH PARAMS ─────────────────────────────────────
function Post({ id }: { id: string }) {
  const { data: post } = useQuery({
    queryKey: ['post', id],  // cache key includes param
    queryFn: () => fetch(\`/api/posts/\${id}\`).then(r => r.json()),
  });
  
  return <div>{post?.title}</div>;
}

// ─── MUTATIONS ─────────────────────────────────────────────
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreatePostForm() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newPost: Post) => 
      fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
      }).then(r => r.json()),
    
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      mutation.mutate({ title: 'New Post', content: 'Content' });
    }}>
      <button disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}

// ─── OPTIMISTIC UPDATES ────────────────────────────────────
const mutation = useMutation({
  mutationFn: updatePost,
  
  onMutate: async (newPost) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['posts'] });
    
    // Snapshot previous value
    const previous = queryClient.getQueryData(['posts']);
    
    // Optimistically update
    queryClient.setQueryData(['posts'], (old: Post[]) => [
      ...old,
      { ...newPost, id: 'temp-id' },
    ]);
    
    return { previous };
  },
  
  onError: (err, newPost, context) => {
    // Rollback on error
    queryClient.setQueryData(['posts'], context.previous);
  },
  
  onSettled: () => {
    // Refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});

// ─── INFINITE SCROLL ───────────────────────────────────────
import { useInfiniteQuery } from '@tanstack/react-query';

function PostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => 
      fetch(\`/api/posts?page=\${pageParam}\`).then(r => r.json()),
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  });
  
  return (
    <>
      {data.pages.map(page => 
        page.posts.map(post => <div key={post.id}>{post.title}</div>)
      )}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
  );
}

// ─── CACHE KEYS & INVALIDATION ─────────────────────────────
// Cache by key hierarchy
['posts']              // all posts
['post', 123]          // single post
['posts', { type: 'draft' }]  // filtered posts

// Invalidate all posts queries
queryClient.invalidateQueries({ queryKey: ['posts'] });

// Invalidate specific post
queryClient.invalidateQueries({ queryKey: ['post', 123] });`,
    note: "React Query is not for client state (use useState/Zustand for that). It's specifically for server state: API data, database queries. Features: automatic retries, polling, cache invalidation, devtools. Essential for any app with server data.",
  },
];

const categories = ["Patterns", "Libraries"];

const categoryMeta: Record<string, { badge: string; icon: string }> = {
  "Patterns": { badge: "badge-orange", icon: "🏗️" },
  "Libraries": { badge: "badge-purple", icon: "📦" },
};

export default function StatePage() {
  const grouped = categories.map((cat) => ({
    name: cat,
    items: concepts.filter((c) => c.category === cat),
  }));

  return (
    <div className="container">
      <div className="page-header">
        <div className="meta">
          <span className="badge badge-orange">State</span>
          <span className="badge badge-cyan">{concepts.length} Concepts</span>
          <span className="badge badge-blue">Server Component</span>
        </div>
        <h1>State Management</h1>
        <p>
          Complete guide to React state management: patterns (Context, useReducer), 
          libraries (Zustand, Redux, Jotai), and server state (React Query).
        </p>
      </div>

      <div className="tip-box">
        <strong>📌 Interview Pro Tip</strong>
        Distinguish server state from client state. Know when to use Context vs
        external libraries. Understand Redux/Zustand tradeoffs. React Query is
        essential for server data — don't manage it manually with useState.
      </div>

      {grouped.map((group) => {
        const meta = categoryMeta[group.name];
        return (
          <section key={group.name}>
            <div className="category-header">
              <span className={`badge ${meta.badge}`}>
                {meta.icon} {group.name}
              </span>
              <h2>{group.name}</h2>
              <span style={{ color: "var(--muted)", fontSize: "0.75rem" }}>
                {group.items.length} concepts
              </span>
            </div>

            {group.items.map((concept) => (
              <div
                key={concept.id}
                id={concept.id}
                className="card concept-section"
                style={{ marginBottom: "1.2rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    marginBottom: "0.6rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span className={`badge ${concept.badgeClass}`}>
                    {concept.category}
                  </span>
                  <h2
                    style={{
                      fontSize: "1.05rem",
                      fontFamily: "Syne, sans-serif",
                      margin: 0,
                    }}
                  >
                    {concept.title}
                  </h2>
                </div>

                <p style={{ marginBottom: "0.75rem" }}>{concept.desc}</p>

                <pre className="code-block">{concept.code}</pre>

                <div className="tip-box" style={{ marginBottom: 0 }}>
                  <strong>💡 Interview Note</strong> {concept.note}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
