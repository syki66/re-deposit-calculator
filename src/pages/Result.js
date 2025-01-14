import React from "react";
import { useNavigate } from "react-router-dom";
import { addComma } from "../utils/validator";

export default function Result() {
  const navigate = useNavigate();

  const inputs = JSON.parse(sessionStorage.getItem("inputs"));
  const result = JSON.parse(sessionStorage.getItem("result"));

  const oldDeposit = Math.round(result["old"]);
  const newDeposit = Math.round(result["new"]);

  const DepositDiff = Math.abs(oldDeposit - newDeposit);

  let msg = "";
  if (oldDeposit < newDeposit) {
    msg = `기존 예금 해지 후, 새 예금으로 갈아타는 것이`;
  } else {
    msg = `기존 예금을 유지하는 것이`;
  }

  return (
    <>
      <div className="outter__container">
        <h1 className="h1">결과</h1>

        <div className="container">
          <section className="section">
            <h2 className="h2">
              {msg}
              <div
                style={{
                  marginTop: "0.5em",
                }}
              >
                <span style={{ color: "red" }}>{`${addComma(
                  DepositDiff
                )}원 `}</span>
                이득
              </div>
            </h2>

            <p className="content">
              <label>
                금액 :<div>{addComma(inputs.amount)}</div>원
              </label>
              <label>
                기간 :<div>{inputs.period}</div>
                개월
              </label>
            </p>
          </section>

          <section className="section">
            <h2 className="h2">기존 예금 이자</h2>
            <h2 className="h2">{addComma(oldDeposit)}원</h2>
            <p className="content">
              <label>
                금리 :<div>{inputs.oldInterest}</div>%
              </label>
              <label>
                진행도 :<div>{Math.round(result.progress * 100) / 100}</div>%
              </label>
            </p>
          </section>

          <section className="section">
            <h2 className="h2">새 예금 이자</h2>
            <h2 className="h2">{addComma(newDeposit)}원</h2>
            <p className="content">
              <label>
                금리 :<div>{inputs.newInterest}</div>%
              </label>
            </p>
          </section>
        </div>

        <div className="btn__container">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            돌아가기
          </button>
        </div>
      </div>
    </>
  );
}
