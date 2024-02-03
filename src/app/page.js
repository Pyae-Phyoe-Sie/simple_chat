'use client';
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState(0);

  const inputHandler = (event) => {
    setUsername(event.target.value);
  };

  const selectHandler = (event) => {
    setGender(event.target.value);
  };

  function gotoChat() {
    router.push(`/chat?name=${username}&gender=${gender}`);
  }

  return (
    <main className={styles.main}>
      <div className="col-6 my-5 mx-auto">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="username" className="form-label">Please key in your name</label>
            <input type="text" className="form-control" id="username" onKeyUp={inputHandler} />
          </div>
          <div className="col-md-6">
            <label htmlFor="username" className="form-label">Please key in your name</label>
            <select className="form-control" onChange={selectHandler}>
              <option value="0" selected>Male</option>
              <option value="1">Female</option>
            </select>
          </div>
          <div className="col-12">
            <button type="button" onClick={gotoChat} className="btn btn-primary">Go to Chat</button>
          </div>
        </form>
      </div>
    </main>
  );
}
