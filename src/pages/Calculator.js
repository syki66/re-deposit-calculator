import React, { useState } from "react";
import { getDateDiff, addMonths } from "../utils/dateUtil";
import { isFloat, isOnlyNum, addComma, removeComma } from "../utils/validator";
import { useNavigate } from "react-router-dom";

export default function Calculator() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    period: 12,
    amount: "",
    oldDate: "",
    oldInterest: "",
    oldTax: "15.4",
    newDate: "",
    newInterest: "",
    newTax: "15.4",
  });

  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    let strippedValue = removeComma(value);
    const valid = isOnlyNum(strippedValue) && strippedValue < Math.pow(10, 15);

    // 빈값일 경우
    if (isNaN(strippedValue)) {
      setInputs({
        ...inputs,
        [name]: "",
      });
    }

    if (valid) {
      setInputs({
        ...inputs,
        [name]: strippedValue,
      });
    } else {
      // 에러헬퍼
    }
  };

  const handlePeriodChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: Number(value),
    });
  };

  const handleRateChange = (e) => {
    const { name, value } = e.target;
    const valid =
      (isFloat(value) && value < 1000 && value.length < 9) || value === "";

    if (valid) {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // 새예금 날짜가 기존예금보다 큰지 체크하기
    // 개월과 새 예금 유효성 체크

    const dueDate = addMonths(new Date(inputs["oldDate"]), inputs["period"]);
    const fullDays = getDateDiff(inputs["oldDate"], dueDate);
    const remainingDays = getDateDiff(inputs["newDate"], dueDate);

    const oldDeposit =
      ((inputs["amount"] *
        (inputs["oldInterest"] * 0.01) *
        ((100 - inputs["oldTax"]) * 0.01)) /
        365) *
      fullDays;
    const newDeposit =
      ((inputs["amount"] *
        (inputs["newInterest"] * 0.01) *
        ((100 - inputs["newTax"]) * 0.01)) /
        365) *
      remainingDays;

    const result = {
      old: oldDeposit,
      new: newDeposit,
      progress: ((fullDays - remainingDays) / fullDays) * 100,
    };

    sessionStorage.setItem("result", JSON.stringify(result));
    sessionStorage.setItem("inputs", JSON.stringify(inputs));

    navigate("/result");
  };

  return (
    <>
      <div className="outter__container">
        <h1 className="h1">예금 갈아타기 계산기</h1>

        <div className="container">
          <section className="section">
            <h2 className="h2">공통 입력</h2>
            <p className="content">
              <label>
                금액 :
                <input
                  name="amount"
                  value={addComma(inputs["amount"])}
                  onChange={handleAmountChange}
                />
                원
              </label>
              <label>
                기간 :
                <select
                  name="period"
                  value={inputs["period"]}
                  onChange={handlePeriodChange}
                >
                  {[...Array(60).keys()].map((el) => (
                    <option key={el + 1} value={el + 1}>
                      {el + 1}
                    </option>
                  ))}
                </select>
                개월
              </label>
            </p>
          </section>

          <section className="section">
            <h2 className="h2">기존 예금</h2>
            <p className="content">
              <label>
                금리 :
                <input
                  name="oldInterest"
                  value={inputs["oldInterest"]}
                  onChange={handleRateChange}
                />
                %
              </label>
              <label>
                세율 :
                <input
                  name="oldTax"
                  value={inputs["oldTax"]}
                  onChange={handleRateChange}
                />
                %
              </label>
              <label>
                가입일 :
                <input
                  className="datePicker"
                  name="oldDate"
                  value={inputs["oldDate"]}
                  onChange={handleDateChange}
                  type="date"
                />
              </label>
            </p>
          </section>

          <section className="section">
            <h2 className="h2">새 예금</h2>
            <p className="content">
              <label>
                금리 :
                <input
                  name="newInterest"
                  value={inputs["newInterest"]}
                  onChange={handleRateChange}
                />
                %
              </label>
              <label>
                세율 :
                <input
                  name="newTax"
                  value={inputs["newTax"]}
                  onChange={handleRateChange}
                />
                %
              </label>
              <label>
                가입일 :
                <input
                  className="datePicker"
                  name="newDate"
                  value={inputs["newDate"]}
                  onChange={handleDateChange}
                  type="date"
                />
              </label>
            </p>
          </section>
        </div>

        <div className="btn__container">
          <button onClick={handleSubmit}>계산하기</button>
        </div>
      </div>

      {/* <label>
        <input type="radio" name="fruit" value="apple" /> 단리
      </label>
      <label>
        <input type="radio" name="fruit" value="banana" /> 복리
      </label> */}
    </>
  );
}
