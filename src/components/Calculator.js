import React, { useState } from "react";
import { getDateDiff, addMonths } from "../utils/DateUtil";

export default function Calculator() {
  const [inputs, setInputs] = useState({
    period: 12,
    amount: "",
    oldDate: "",
    oldInterest: "",
    oldTax: "0.154",
    newDate: "",
    newInterest: "",
    newTax: "0.154",
  });
  const [result, setResult] = useState({
    old: "",
    new: "",
  });

  const isOnlyNum = (value) => {
    // 숫자만 포함하고 있는지 검사
    if (/^\d+$/.test(value)) {
      return true;
    }
    return false;
  };

  const removeDeco = (num) => {
    // 쉼표 제거
    return parseInt(num.replace(/[^0-9]/g, ""), 10);
  };

  const addDeco = (num) => {
    // 쉼표 추가
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    let strippedValue = removeDeco(value);
    if (isNaN(strippedValue)) {
      setInputs({
        ...inputs,
        [name]: "",
      });
    }
    if (isOnlyNum(strippedValue) && strippedValue < Math.pow(10, 15)) {
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

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const isFloat = (value) => {
    if (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value)) {
      return true;
    }
    return false;
  };

  const handleRateChange = (e) => {
    const { name, value } = e.target;
    if (isFloat(value) || value === "") {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    // 새예금 날짜가 기존예금보다 큰지 체크하기
    // 개월과 새 예금 유효성 체크

    const dueDate = addMonths(new Date(inputs["oldDate"]), inputs["period"]);
    const fullDays = getDateDiff(inputs["oldDate"], dueDate);
    const remainingDays = getDateDiff(inputs["newDate"], dueDate);

    const oldDeposit =
      ((inputs["amount"] * inputs["oldInterest"] * (1 - inputs["oldTax"])) /
        365) *
      fullDays;
    const newDeposit =
      ((inputs["amount"] * inputs["newInterest"] * (1 - inputs["newTax"])) /
        365) *
      remainingDays;

    setResult({
      old: oldDeposit,
      new: newDeposit,
    });

    // console.log(inputs);
  };

  return (
    <>
      <h1>재예금 계산기</h1>

      <section style={{ background: "pink" }}>
        <h2>공통</h2>
        <p>
          <label>
            <input
              name="amount"
              value={addDeco(inputs["amount"])}
              onChange={handleAmountChange}
            />
            원
          </label>
          <label>
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

      <section style={{ background: "gray" }}>
        <h2>기존예금</h2>
        <p>
          <label>
            <input
              name="oldInterest"
              value={inputs["oldInterest"]}
              onChange={handleRateChange}
            />
            %
          </label>
          <label>
            <input
              name="oldTax"
              value={inputs["oldTax"]}
              onChange={handleRateChange}
            />
            %
          </label>
          <input
            name="oldDate"
            value={inputs["oldDate"]}
            onChange={handleDateChange}
            type="date"
          />
        </p>
      </section>

      <section style={{ background: "green" }}>
        <h2>새 예금</h2>
        <p>
          <label>
            <input
              name="newInterest"
              value={inputs["newInterest"]}
              onChange={handleRateChange}
            />
            %
          </label>
          <label>
            <input
              name="newTax"
              value={inputs["newTax"]}
              onChange={handleRateChange}
            />
            %
          </label>
          <input
            name="newDate"
            value={inputs["newDate"]}
            onChange={handleDateChange}
            type="date"
          />
        </p>
      </section>

      <input type="submit" onClick={handleSubmit} />

      <div>{result["old"]}</div>
      <div>{result["new"]}</div>

      {/* <label>
        <input type="radio" name="fruit" value="apple" /> 단리
      </label>
      <label>
        <input type="radio" name="fruit" value="banana" /> 복리
      </label> */}
    </>
  );
}
