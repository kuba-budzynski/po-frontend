import React, { useState } from "react";
import SETTINGS from "../config/settings";
import Link from "next/link";
import {useRouter} from "next/router";
import {Wrapper} from "components/Utils";

export default function Home() {
  const [teamId, setTeamId] = useState(SETTINGS.token())
  const router = useRouter()
  const onTeamSubmit = (e) => {
    e.preventDefault()
    if (!window) return

    localStorage.setItem("teamId", teamId)
    router.push(`/team`)
  }
  return (
    <div>
      <main>
        <div className="max-w-5xl mx-auto py-8 sm:px-6 px-4 lg:px-8">
          <Wrapper>
            <h1 className="text-xl font-bold mb-4">Zaloguj jako drużyna</h1>
            <form onSubmit={onTeamSubmit}>
              <input className="py-3 px-4 bg-gray-100 rounded-lg focus:outline-none focus-visible:ring-2 mr-2" value={teamId} onChange={(e) => setTeamId(e.target.value)} />
              <button className="bg-blue-700 font-bold text-white px-5 py-3 rounded-lg shadow hover:bg-blue-900 focus-visible:ring-2 focus:outline-none" type="submit">Przejdź do panelu</button>
            </form>
          </Wrapper>
          <Wrapper>
            <Link href="/admin-panel/sessions">
              <h1 className="text-xl font-bold cursor-pointer text-blue-700 hover:text-blue-900 underline">Przejdź do panelu admina</h1>
            </Link>
          </Wrapper>
        </div>
      </main>
    </div>
  )
}
