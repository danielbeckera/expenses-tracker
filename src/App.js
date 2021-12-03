import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { withStyles } from "@material-ui/styles";

import BalanceControlCard from "./components/BalanceControlCard";
import History from "./components/History";

const ButtonAdd = withStyles({
  root: {
    marginTop: "1em",
    fontWeight: "bold",
  },
})(Button);

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const SubTitle = styled.h4`
  margin-bottom: 0;
`;

const Balance = styled.h4`
  margin-top: 0.5em;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardSeparator = styled.div`
  margin-bottom: 1em;
`;

const OutterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30%;
  width: 60%;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

function App() {
  const [transaction, setTransaction] = useState({
    transactionText: "",
    transactionValue: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPositive, setTotalPositive] = useState(0);
  const [positiveValues, setPositiveValues] = useState([]);
  const [totalNegative, setTotalNegative] = useState(0);
  const [negativeValues, setNegativeValues] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleAdd = () => {
    setExpenses((oldArray) => [...oldArray, transaction]);
    setTransaction({ transactionText: "", transactionValue: "" });
  };

  useEffect(() => {
    const onlyPositives = expenses.filter((item) => {
      if (item.transactionValue > 0) {
        return item.transactionValue;
      }
    });
    const filteredPositives = onlyPositives.map((item) => {
      return item.transactionValue;
    });
    setPositiveValues(filteredPositives);
  }, [expenses]);

  useEffect(() => {
    positiveValues.reduce((total, current) => {
      total = parseFloat(total) + parseFloat(current);
      setTotalPositive(total);
      return total;
    }, 0);
  }, [positiveValues]);

  // filtra expenses negativas e adiciona em uma variavel, essa variavel apos isso é mapeada e retornado apenas o valor, e nao as outras propriedades, apos isso eh inserido apenas os valores no negativeValues state
  useEffect(() => {
    const onlyNegatives = expenses.filter((item) => {
      if (item.transactionValue < 0) {
        return item.transactionValue;
      }
    });
    const filteredNegatives = onlyNegatives.map((item) => {
      return item.transactionValue;
    });
    setNegativeValues(filteredNegatives);
  }, [expenses]);

  // aqui é feito a soma de todos os itens do array negativeValues state com reduce, trazendo um total do valor negativo e setando no estado totalNegative.
  useEffect(() => {
    negativeValues.reduce((total, current) => {
      total = parseFloat(total) + parseFloat(current);
      setTotalNegative(total);
      return total;
    }, 0);
  }, [negativeValues]);

  useEffect(() => {
    expenses.reduce((total, current) => {
      total = parseFloat(total) + parseFloat(current.transactionValue);
      setTotal(total);
      return total;
    }, 0);
  }, [expenses]);

  return (
    <Wrapper>
      <OutterContainer>
        <Title>Expenses Tracker</Title>
        <SubTitle>Your balance:</SubTitle>
        <Balance>${total}</Balance>
        <BalanceControlCard negative={totalNegative} positive={totalPositive} />
        <SubTitle>History</SubTitle>
        {expenses.map((item) => {
          return (
            <CardSeparator>
              <History
                openModal={handleOpenModal}
                value={item.transactionValue}
                title={
                  item.transactionText.charAt(0).toUpperCase() +
                  item.transactionText.slice(1)
                }
                key={item.transactionText}
              />
            </CardSeparator>
          );
        })}
        <SubTitle>New item:</SubTitle>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={handleChange}
          name="transactionText"
          value={transaction.transactionText}
        />
        <SubTitle>Amount (- for negative):</SubTitle>
        <TextField
          type="number"
          id="outlined-basic"
          variant="outlined"
          name="transactionValue"
          onChange={handleChange}
          value={transaction.transactionValue}
        />
        <ButtonAdd
          disabled={
            transaction.transactionText === "" ||
            transaction.transactionValue === ""
          }
          onClick={handleAdd}
          variant="contained"
        >
          Add transaction
        </ButtonAdd>
      </OutterContainer>
    </Wrapper>
  );
}

export default App;
