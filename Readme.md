# E-Voting on Blockchain

A full-stack decentralized voting application that combines a React frontend, Express/MongoDB backend, and a Solidity smart contract deployed via Hardhat. Organizers manage elections off-chain; vote submission and tallying are recorded on-chain through MetaMask and ethers.js.

---

## Prerequisites

| Requirement | Version / Notes |
|-------------|-----------------|
| Node.js | 16.x or later |
| npm | Bundled with Node.js |
| MetaMask | Browser extension with a test network configured (e.g. Polygon Mumbai) |
| MongoDB | Atlas URI or local instance |

---

## Local Setup

### 1. Environment configuration

Copy the sample environment file and fill in the required values:

```bash
cp .env.sample .env
```

```env
PORT=5000
MONGO_URL=<your-mongodb-connection-string>
EMAIL=<smtp-email>
EMAILPASSWORD=<smtp-password>
```

### 2. Backend API (required for the assessment)

From the repository root:

```bash
npm install
npm run dev
```

The API listens on `http://localhost:5000` and exposes routes under `/api/auth`.

### 3. Frontend (required for the assessment)

```bash
cd client
npm install
npm start
```

The React app runs at `http://localhost:3000`.

**For the assessment, run both the backend (step 2) and the frontend.** Both problems require the full stack, browser DevTools, and MetaMask.

Point the client at your local API by updating `client/src/Data/Variables.jsx`:

```js
export const serverLink = "http://localhost:5000/api/auth/";
```

Ensure the contract address in `client/src/utils/contractInstance.js` matches your deployed `Voting` contract on the network configured in MetaMask.

### 4. Smart contract (optional for local testing)

```bash
cd hardhat
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network <your-network>
```

Update the exported `contractAddress` in `client/src/utils/contractInstance.js` with the address returned by the deploy script.

---

## Senior Developer Assessment

**Repository:** https://github.com/accurasofthire/e-voting-blockchain  
**Target level:** Senior (5+ years)  
**Estimated time:** 1.5 hours total (~45 min per problem)

Complete **both problems** below with the backend and frontend running (see Local Setup above). This assessment evaluates your ability to audit a production-style hybrid system spanning React, Express/MongoDB, Python biometrics, and Solidity.

### Submission requirements

Each problem submission **must** include:

| Requirement | Details |
|-------------|---------|
| **Written report** | 600–900 words per problem |
| **Code citations** | Exact file paths, function names, and line references |
| **Screenshots** | Minimum **6 labeled screenshots** per problem (see each problem's list) |
| **Evidence format** | PNG/JPG; filename pattern: `P1-01-description.png` |

Reports that rely only on static code reading **without** browser, Network tab, and MetaMask evidence will **not** be accepted.

| Problem | Weight | Frontend | Backend | MetaMask |
|---------|--------|----------|---------|----------|
| Problem 1 — Cross-layer election state integrity audit | 50 pts | Required | Required | Required |
| Problem 2 — Vote authorization & identity trust boundary analysis | 50 pts | Required | Required | Required |

**Total score:** 100 points

---

### Problem 1 — Cross-Layer Election State Integrity Audit

**Weight:** 50 points  
**Focus:** Distributed state consistency · failure modes · architectural remediation

#### Objective

This application maintains election state in **two independent stores**:

- **Off-chain:** MongoDB (`Election.currentPhase`, candidate lists, voter profiles)
- **On-chain:** Solidity mappings (`electionStarted`, `electionEnded`, vote tallies)

Produce a **forensic integrity audit** proving where these layers diverge, how they desynchronize under normal admin operations, and what failures occur when they do.

Analyze **identifier mapping**, **phase transition ordering**, **partial-failure scenarios**, and **results aggregation correctness**.

#### Mandatory investigation scenarios

Execute or reason through all four scenarios. For each, capture evidence.

**Scenario A — Election identifier schism**

1. Log in as admin (`/admin/login`) and open the dashboard.
2. Create **two** elections in MongoDB via the admin UI. Note each MongoDB `_id`.
3. Inspect `localStorage` keys `listsize` and `connected address`.
4. Trace every reference to `listsize` across the frontend (minimum: `ViewDashboard.jsx`, `EditPhase.jsx`, `ElectionsList.jsx`, `ResultElection.jsx`).

**Scenario B — Phase transition split-brain**

1. Create an election in MongoDB (`currentPhase: init`).
2. Advance phase to **voting** via admin `EditPhase`.
3. Capture Network tab: chain transaction **and** `POST /phase/edit/:id`.
4. Simulate or describe: chain tx **succeeds**, MongoDB update **fails** (or reverse). Document resulting system state.

**Scenario C — Vote routed to wrong on-chain slot**

1. With two MongoDB elections (`Election-A`, `Election-B`), one in `voting` phase.
2. Trace vote submission from `CandidateLayout` → `ElectionsList` → `voteTo`.
3. Determine whether the vote binds to the **correct MongoDB election** or always to `localStorage.listsize`.

**Scenario D — Results index misalignment**

1. Register **N** candidates in MongoDB but **M** candidates on-chain (M ≠ N if reproducible).
2. Open `/result` and trace `ResultElection.jsx` loop logic.
3. Identify whether on-chain results can be mapped to wrong candidates or throw index errors.

#### Deliverables

1. **Identifier mapping matrix** — For each vote/phase/result operation: MongoDB identifier used, on-chain identifier used, source of on-chain ID.
2. **Phase synchronization sequence diagram** — ASCII or Mermaid of the actual flow when admin moves an election to `voting`. Include `EditPhase.jsx`, `contract.startVoting()`, `POST /api/auth/phase/edit/:id`, and MongoDB update. Mark points where rollback is absent.
3. **Failure mode analysis (minimum 4)** — For each: trigger, off-chain state, on-chain state, user-visible symptom, severity (Critical / High / Medium). Must include hardcoded `listSize = 1` in `ViewDashboard.jsx`, public `addOrganizer`, inverted Solidity modifiers, and MongoDB vs on-chain index iteration in `ResultElection.jsx`.
4. **Remediation architecture (200+ words)** — Production-grade unification design: single source of truth for election identity, atomic or compensating phase transitions, admin provisioning flow. No code required.

#### Required screenshots (minimum 6)

| ID | Capture |
|----|---------|
| P1-01 | Admin dashboard showing `localStorage` (`listsize`, `connected address`) in DevTools |
| P1-02 | Two MongoDB elections with different `_id` values (Compass or API response) |
| P1-03 | Network tab: `startVoting` tx + `POST phase/edit` on phase change |
| P1-04 | MetaMask tx preview for `voteTo` showing all 4 arguments |
| P1-05 | `/result` page with vote counts (or revert/error toast) |
| P1-06 | Application tab → Local Storage after admin dashboard load |

#### Scoring rubric — Problem 1

| Criterion | Points |
|-----------|--------|
| Identifier schism correctly mapped with code refs | 12 |
| Phase split-brain + missing rollback documented | 12 |
| ≥ 4 failure modes with accurate severity | 10 |
| Results misalignment analysis (`ResultElection.jsx`) | 8 |
| Remediation architecture (coherent, production-aware) | 5 |
| Screenshot evidence complete and labeled | 3 |

---

### Problem 2 — Vote Authorization & Identity Trust Boundary Analysis

**Weight:** 50 points  
**Focus:** Security architecture · attack chains · trust boundary mapping

#### Objective

Map **every trust boundary** from the moment a voter clicks **Vote** until the vote is recorded on-chain. Demonstrate **at least two exploitable or broken authorization paths** with evidence.

Connect frontend assumptions, API weaknesses, biometric gating, wallet binding, and smart contract enforcement into one coherent threat model.

#### Mandatory investigation scenarios

**Scenario A — Full vote authorization chain**

Trace the complete path:

```
CandidateLayout.handleClick
  → [optional] face recognition (POST /op/:username)
  → navigate(/login, { state: info })
  → ElectionsList.handleSubmit
  → POST /login
  → contract.voteTo(...)
  → POST /votingEmail
```

For **each hop**, document: what identity is asserted, what validates it, and what an attacker can forge or skip.

**Scenario B — Wallet impersonation attack**

1. Register Voter-A with `votingAddress = 0xAAA...`.
2. Connect MetaMask as Voter-B (`0xBBB...`).
3. Attempt to vote for Voter-A (via login as Voter-A, or direct contract call via Hardhat console).
4. Capture MetaMask prompt: who is `msg.sender` vs who is `_voter` in `voteTo`?

**Scenario C — Face recognition gate bypass**

1. Set `isFaceRecognitionEnable = false` in `Variables.jsx` OR trace the `else` branch in `CandidateLayout.jsx`.
2. Document what voter identity fields are **omitted** from navigation state.
3. Determine whether vote can proceed without wallet-to-voter binding at click time.

**Scenario D — Admin & API surface reconnaissance**

1. Inspect `AdminLogin.jsx` authentication mechanism.
2. Call `GET /api/auth/users` and `POST /api/auth/votingEmail` without any auth token.
3. Inspect login response body on `201`.

#### Deliverables

1. **Trust boundary diagram** — Mermaid or ASCII showing trust zones: Browser/MetaMask, React client, Express API, Python subprocess, Solidity contract. Mark boundaries where authentication is assumed but not enforced.
2. **Attack chain documentation (minimum 2)** — For each: attack name, prerequisites, numbered reproduction steps, root cause (file + function + line), impact, screenshot reference. Must address on-chain vote impersonation (`voteTo` / `msg.sender` mismatch) and at least one of: API auth bypass, face recognition flaw, or admin credential exposure.
3. **`CandidateLayout.jsx` logic defect analysis** — Analyze the `for` loop in `handleClick` (lines 36–80): why first non-matching user triggers error toast and `return`; behavior when `GET /users` returns multiple voters; impact.
4. **Defense-in-depth remediation plan** — Prioritized fix list (P0 / P1 / P2) with minimum **6 items** across frontend, backend, and contract.

#### Required screenshots (minimum 6)

| ID | Capture |
|----|---------|
| P2-01 | Candidate card → Vote click → login form showing pre-filled voter fields |
| P2-02 | Network tab: `POST /login` response body (show password field in response) |
| P2-03 | MetaMask `voteTo` confirmation showing `_voter` ≠ connected account (or Hardhat trace) |
| P2-04 | Network tab: unauthenticated `GET /users` response |
| P2-05 | Face recognition flow OR `isFaceRecognitionEnable = false` path reaching login |
| P2-06 | Admin login page + DevTools Sources showing hardcoded credential check |

#### Scoring rubric — Problem 2

| Criterion | Points |
|-----------|--------|
| Complete trust boundary diagram (all 5 zones) | 10 |
| Attack chain 1: on-chain impersonation (reproduced or traced) | 12 |
| Attack chain 2: API/biometric/admin (reproduced or traced) | 10 |
| `CandidateLayout` loop defect analysis | 6 |
| Prioritized remediation (≥ 6 items, cross-layer) | 8 |
| Screenshot evidence complete and labeled | 4 |

---

## Answer Key (For Evaluators)

<details>
<summary>Problem 1 — Expected findings</summary>

#### Identifier mapping matrix (expected)

| Operation | MongoDB ID | On-chain ID | Source |
|-----------|------------|-------------|--------|
| Load election list (`/election`) | `_id` from `Election.find({ currentPhase: "voting" })` | Not used | — |
| Vote (`ElectionsList.addVote`) | `data.election_id` (display only) | `localStorage.listsize` | Hardcoded `1` in `ViewDashboard.jsx` |
| Start voting (`EditPhase`) | `data._id` in API URL | `localStorage.listsize` | Same |
| Results (`ResultElection`) | Not used for indexing | `localStorage.listsize` | Same |
| Organizer slot init | Not stored in MongoDB | `addOrganizer(signerAddress, 1)` | `ViewDashboard.jsx` |

**Key finding:** MongoDB `_id` and on-chain election slot are **never linked**. Multiple MongoDB elections share one on-chain slot (`1`).

#### Phase sync sequence (expected)

```
Admin submits EditPhase (currentPhase = "voting")
  → contractInstance()
  → contract.startVoting(organizerConnected, listSize)   [on-chain FIRST]
  → await startElectionTx.wait()
  → axios.post(serverLink + "phase/edit/" + data._id)      [MongoDB SECOND]
  → Election.findByIdAndUpdate(id, { currentPhase })       [no rollback if fails]
```

**No rollback** if MongoDB update fails after chain confirmation, or if chain fails after UI toast success.

#### Failure modes (minimum expected 4)

| # | Failure | Trigger | Severity |
|---|---------|---------|----------|
| 1 | Wrong election receives vote | Voter votes in Election-B; `voteTo` uses `listsize=1` always | Critical |
| 2 | Phase desync | Chain `startVoting` succeeds; `phase/edit` fails | Critical |
| 3 | Modifier bypass | `isElectionOrganizer` runs `_` before `require` | High |
| 4 | Public organizer init | Anyone calls `addOrganizer(attackerAddr, id)` | High |
| 5 | Results index mismatch | `ResultElection` loops MongoDB candidate count but reads on-chain by index | High |
| 6 | Stale localStorage organizer | `ViewDashboard` sets `connected address` from stale `currentAccount` not `signerAddress` | Medium |

#### Remediation (expected themes)

Strong answers should mention: store `onChainElectionId` on MongoDB `Election` at provision time; server-orchestrated phase transitions with compensation pattern; remove `localStorage` as election ID source; index events instead of positional `displayCandidateResults`.

</details>

<details>
<summary>Problem 2 — Expected findings</summary>

#### Trust boundaries (expected)

| Zone | Trusts | Not enforced by |
|------|--------|-----------------|
| React client | Login form = voter identity | Contract (no session binding) |
| React client | `location.state.user_votingAddress` = voter wallet | Contract (`voteTo` ignores `msg.sender`) |
| Express API | `{ username, password }` = voter | No JWT; vote endpoints unprotected |
| Face recognition | Python match = physical presence | Server webcam; bypass via flag; loop bug |
| MetaMask | `msg.sender` = transaction author | Not compared to `_voter` param |
| Contract | `_voter` param = voter | Anyone can supply any registered address |

#### Attack chain 1 — Remote vote impersonation (expected)

1. Attacker knows Voter-A's registered address (public via `GET /users`).
2. Voter-A has not voted (`hasVoted = false`).
3. Attacker calls `voteTo(candidate, organizer, voterA, listSize)` from any wallet.
4. Contract increments vote; `msg.sender` only appears in event, not validated.

**Root cause:** `Voting.sol` `voteTo()` — no `require(msg.sender == _voter)`, no `voterExists` check. **Impact:** Critical.

#### Attack chain 2 options (accept any strong answer)

- **Plaintext password exposure:** `AuthController.login.controller` returns full user document on `201` including password. No hashing, JWT, or server auth on vote.
- **Admin credential hardcoding:** `AdminLogin.jsx` — client-side `admin123` / email check; visible in bundled JS.
- **Face recognition loop bug:** `CandidateLayout.jsx` lines 36–79 — loop errors on first non-matching user instead of continuing.
- **Unauthenticated API:** `GET /users`, `POST /votingEmail`, `POST /phase/edit/:id` have no auth middleware.

#### CandidateLayout loop defect (expected)

The `else` branch executes when **any** user in the array doesn't match `currentAccount`, immediately erroring and returning — it does **not** continue iterating. When `isFaceRecognitionEnable = false`, navigation state omits `user_id`, `user_username`, `user_votingAddress`.

#### Remediation plan (expected minimum 6 items)

| Priority | Fix |
|----------|-----|
| P0 | `require(msg.sender == _voter)` + `voterExists` + `candidateExists` in `voteTo` |
| P0 | Fix inverted modifiers in `Voting.sol` |
| P0 | bcrypt passwords; never return password in API response |
| P1 | JWT/session; server-side vote authorization endpoint |
| P1 | Move admin auth to backend with hashed credentials |
| P1 | Fix `CandidateLayout` loop — only error after full iteration |
| P2 | Client-side face capture upload instead of server webcam |
| P2 | Auth middleware on all mutating routes |

</details>

**Scoring:** 100 points total (50 per problem). Award full marks when deliverables are accurate, include labeled screenshots, and are validated against the running application.

---

## Project Structure

```
├── client/          React frontend (voter & admin UI)
├── server/          Express API and MongoDB models
├── hardhat/         Solidity contracts and deployment scripts
└── .env.sample      Environment variable template
```
