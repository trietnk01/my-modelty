import styles from "@/assets/scss/home.module.scss";
import {
  DownCircleOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  UpCircleOutlined
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "antd";
import { clsx } from "clsx";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import * as yup from "yup";
interface IFormInput {
  col_number: string;
  row_number: string;
}
const WIDTH_CELL: number = 30;
const INTERVAL_TIME: number = 500;
const SNACK_LEFT: number = WIDTH_CELL * 2;
const SNACK_TOP: number = WIDTH_CELL * 3;
const WORM_LEFT: number = WIDTH_CELL * 4;
const WORM_TOP: number = WIDTH_CELL * 5;
const HomePage = () => {
  const [board, setBoard] = React.useState<any>();
  const [widthBoard, setWidthBoard] = React.useState<number>(0);
  const [heightBoard, setHeightBoard] = React.useState<number>(0);

  const snackRef = React.useRef<HTMLDivElement | null>(null);
  const wormRef = React.useRef<HTMLDivElement | null>(null);
  let mySnackInterval: any = null;
  const schema = yup
    .object({
      col_number: yup.string().required("Width required!"),
      row_number: yup.string().required("Height required!")
    })
    .required();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: {
      col_number: "20",
      row_number: "20"
    },
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<IFormInput> = async (dataFrm) => {
    const { col_number, row_number } = dataFrm;
    const colNumber: number = col_number
      ? parseInt(col_number.toString().replace(new RegExp(",", "g"), ""))
      : 0;
    const rowNumber: number = row_number
      ? parseInt(row_number.toString().replace(new RegExp(",", "g"), ""))
      : 0;
    let board = [];
    for (var i = 0; i < rowNumber; i++) {
      let currentRow = [];
      for (var j = 0; j < colNumber; j++) {
        currentRow.push(j);
      }
      board.push(currentRow);
    }
    const widthBoard: number = colNumber * WIDTH_CELL;
    const heightBoard: number = rowNumber * WIDTH_CELL;
    handleSnackReset();
    setWidthBoard(widthBoard);
    setHeightBoard(heightBoard);
    setBoard(board);
  };
  const handlePlay = () => {
    mySnackInterval = setInterval(() => {
      if (snackRef && snackRef.current) {
        const snackLeft: number = snackRef.current.offsetLeft;
        if (snackLeft + WIDTH_CELL === widthBoard) {
          clearInterval(mySnackInterval);
        } else {
          snackRef.current.style.left = `${snackLeft + WIDTH_CELL}px`;
        }
      }
    }, INTERVAL_TIME);
  };
  const handleSnackStop = () => {
    clearInterval(mySnackInterval);
  };
  const handleSnackMove = (direction: string) => () => {
    clearInterval(mySnackInterval);
    switch (direction) {
      case "up":
        mySnackInterval = setInterval(() => {
          if (snackRef && snackRef.current) {
            const snackTop = snackRef.current.offsetTop;
            const snackLeft = snackRef.current.offsetLeft;
            if (snackTop === 0) {
              clearInterval(mySnackInterval);
            } else {
              let wormTop: number = 0;
              let wormLeft: number = 0;
              if (wormRef && wormRef.current) {
                wormTop = wormRef.current.offsetTop;
                wormLeft = wormRef.current.offsetLeft;
              }
              if (snackTop === wormTop && snackLeft === wormLeft) {
                const snackHeight = snackRef.current.style.height;
                const snackHeightReplace: number = parseInt(
                  snackHeight.toString().replace(new RegExp("px", "g"), "")
                );
                snackRef.current.style.height = `${snackHeightReplace + WIDTH_CELL}px`;
                const wormTopNew: number = WIDTH_CELL * Math.floor(Math.random() * 18);
                const wormLeftNew: number = WIDTH_CELL * Math.floor(Math.random() * 18);
                if (wormRef && wormRef.current) {
                  wormRef.current.style.top = `${wormTopNew}px`;
                  wormRef.current.style.left = `${wormLeftNew}px`;
                }
              } else {
                snackRef.current.style.top = `${snackTop - WIDTH_CELL}px`;
              }
            }
          }
        }, INTERVAL_TIME);
        break;
      case "down":
        mySnackInterval = setInterval(() => {
          if (snackRef && snackRef.current) {
            const snackTop = snackRef.current.offsetTop;
            const snackLeft = snackRef.current.offsetLeft;
            if (snackTop + WIDTH_CELL === heightBoard) {
              clearInterval(mySnackInterval);
            } else {
              let wormTop: number = 0;
              let wormLeft: number = 0;
              if (wormRef && wormRef.current) {
                wormTop = wormRef.current.offsetTop;
                wormLeft = wormRef.current.offsetLeft;
              }
              if (snackTop === wormTop && snackLeft === wormLeft) {
                const snackHeight = snackRef.current.style.height;
                const snackHeightReplace: number = parseInt(
                  snackHeight.toString().replace(new RegExp("px", "g"), "")
                );
                snackRef.current.style.height = `${snackHeightReplace + WIDTH_CELL}px`;
                const wormTopNew: number = WIDTH_CELL * Math.floor(Math.random() * 18);
                const wormLeftNew: number = WIDTH_CELL * Math.floor(Math.random() * 18);
                if (wormRef && wormRef.current) {
                  wormRef.current.style.top = `${wormTopNew}px`;
                  wormRef.current.style.left = `${wormLeftNew}px`;
                }
              } else {
                snackRef.current.style.top = `${snackTop + WIDTH_CELL}px`;
              }
            }
          }
        }, INTERVAL_TIME);
        break;
      case "prev":
        mySnackInterval = setInterval(() => {
          if (snackRef && snackRef.current) {
            const snackTop = snackRef.current.offsetTop;
            const snackLeft = snackRef.current.offsetLeft;
            if (snackLeft === 0) {
              clearInterval(mySnackInterval);
            } else {
              let wormTop: number = 0;
              let wormLeft: number = 0;
              if (wormRef && wormRef.current) {
                wormTop = wormRef.current.offsetTop;
                wormLeft = wormRef.current.offsetLeft;
              }
              if (snackTop === wormTop && snackLeft === wormLeft) {
                const snackWidth = snackRef.current.style.width;
                const snackWidthReplace: number = parseInt(
                  snackWidth.toString().replace(new RegExp("px", "g"), "")
                );
                snackRef.current.style.width = `${snackWidthReplace + WIDTH_CELL}px`;
                const wormTopNew: number = WIDTH_CELL * Math.floor(Math.random() * 18);
                const wormLeftNew: number = WIDTH_CELL * Math.floor(Math.random() * 18);
                if (wormRef && wormRef.current) {
                  wormRef.current.style.top = `${wormTopNew}px`;
                  wormRef.current.style.left = `${wormLeftNew}px`;
                }
              } else {
                snackRef.current.style.left = `${snackLeft - WIDTH_CELL}px`;
              }
            }
          }
        }, INTERVAL_TIME);
        break;
      case "next":
        mySnackInterval = setInterval(() => {
          if (snackRef && snackRef.current) {
            const snackTop = snackRef.current.offsetTop;
            const snackLeft = snackRef.current.offsetLeft;
            if (snackLeft + WIDTH_CELL === widthBoard) {
              clearInterval(mySnackInterval);
            } else {
              let wormTop: number = 0;
              let wormLeft: number = 0;
              if (wormRef && wormRef.current) {
                wormTop = wormRef.current.offsetTop;
                wormLeft = wormRef.current.offsetLeft;
              }
              if (snackTop === wormTop && snackLeft === wormLeft) {
                const snackWidth = snackRef.current.style.width;
                const snackWidthReplace: number = parseInt(
                  snackWidth.toString().replace(new RegExp("px", "g"), "")
                );
                snackRef.current.style.width = `${snackWidthReplace + WIDTH_CELL}px`;
                const wormTopNew: number = WIDTH_CELL * Math.floor(Math.random() * 18);
                const wormLeftNew: number = WIDTH_CELL * Math.floor(Math.random() * 18);
                if (wormRef && wormRef.current) {
                  wormRef.current.style.top = `${wormTopNew}px`;
                  wormRef.current.style.left = `${wormLeftNew}px`;
                }
              } else {
                snackRef.current.style.left = `${snackLeft + WIDTH_CELL}px`;
              }
            }
          }
        }, INTERVAL_TIME);
        break;
    }
  };
  const handleSnackReset = () => {
    clearInterval(mySnackInterval);
    if (snackRef && snackRef.current) {
      const snackTop: number = WIDTH_CELL * Math.floor(Math.random() * 18);
      const snackLeft: number = WIDTH_CELL * Math.floor(Math.random() * 18);
      snackRef.current.style.width = `${WIDTH_CELL}px`;
      snackRef.current.style.height = `${WIDTH_CELL}px`;
      snackRef.current.style.top = `${snackTop}px`;
      snackRef.current.style.left = `${snackLeft}px`;
    }
    if (wormRef && wormRef.current) {
      const wormTop: number = WIDTH_CELL * Math.floor(Math.random() * 18);
      const wormLeft: number = WIDTH_CELL * Math.floor(Math.random() * 18);
      wormRef.current.style.top = `${wormTop}px`;
      wormRef.current.style.left = `${wormLeft}px`;
    }
  };
  const resetNewWormPosition = (direction: string) => {};
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.boxInput}>
          <div className={styles.kickOffBox}>
            <div>
              <div className={styles.label}>Col number</div>
              <Controller
                name="col_number"
                defaultValue=""
                control={control}
                render={({ field }) => {
                  return (
                    <React.Fragment>
                      <div className={styles.inputText}>
                        <NumberFormat
                          placeholder="Col number *"
                          customInput={Input}
                          thousandSeparator={true}
                          size="large"
                          {...field}
                        />
                      </div>
                      {errors.col_number && (
                        <div className={styles.error}>{errors.col_number.message}</div>
                      )}
                    </React.Fragment>
                  );
                }}
              />
            </div>
            <div className={styles.heightBox}>
              <div className={styles.label}>Row number</div>
              <Controller
                name="row_number"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <React.Fragment>
                      <div className={styles.inputText}>
                        <NumberFormat
                          placeholder="Row number *"
                          customInput={Input}
                          thousandSeparator={true}
                          size="large"
                          {...field}
                        />
                      </div>
                      {errors.row_number && (
                        <div className={styles.error}>{errors.row_number.message}</div>
                      )}
                    </React.Fragment>
                  );
                }}
              />
            </div>
            <div className={styles.heightBox}>
              <div className={styles.buttons}>
                <Button type="primary" htmlType="submit">
                  Create board
                </Button>
                {board && board.length > 0 ? (
                  <React.Fragment>
                    <Button type="primary" htmlType="button" onClick={handlePlay}>
                      Play
                    </Button>
                    <Button type="primary" htmlType="button" onClick={handleSnackStop}>
                      Stop
                    </Button>
                    <Button type="primary" htmlType="button" onClick={handleSnackReset}>
                      Reset
                    </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </div>
            </div>
            <div className={styles.upCircleOutlined}>
              <Button
                type="primary"
                size="large"
                htmlType="button"
                icon={<UpCircleOutlined />}
                onClick={handleSnackMove("up")}
              />
            </div>
            <div className={styles.leftRightOutlined}>
              <Button
                type="primary"
                size="large"
                htmlType="button"
                icon={<LeftCircleOutlined />}
                onClick={handleSnackMove("prev")}
              />
              <Button
                type="primary"
                size="large"
                htmlType="button"
                icon={<RightCircleOutlined />}
                onClick={handleSnackMove("next")}
              />
            </div>
            <div className={styles.bottomCircleOutlined}>
              <Button
                type="primary"
                size="large"
                htmlType="button"
                icon={<DownCircleOutlined />}
                onClick={handleSnackMove("down")}
              />
            </div>
          </div>
        </div>
        {board && board.length > 0 ? (
          <div className={styles.board}>
            <div className={styles.boxRelative}>
              <div
                className={styles.snack}
                style={{
                  width: `${WIDTH_CELL}px`,
                  height: `${WIDTH_CELL}px`,
                  top: `${SNACK_TOP}px`,
                  left: `${SNACK_LEFT}px`
                }}
                ref={snackRef}
              ></div>
              <div
                ref={wormRef}
                className={styles.worm}
                style={{
                  width: `${WIDTH_CELL}px`,
                  height: `${WIDTH_CELL}px`,
                  top: `${WORM_TOP}px`,
                  left: `${WORM_LEFT}px`
                }}
              ></div>
              <div className={styles.boxWrap}>
                {board.map((rowVal: any, idxRow: number) => {
                  return (
                    <div
                      key={`idx-row-${idxRow}`}
                      className={styles.row}
                      style={{ height: `${WIDTH_CELL}px` }}
                    >
                      {rowVal.map((cellVal: any, idxCell: number) => {
                        return (
                          <div
                            key={`idx-cell-${idxCell}`}
                            className={clsx(styles.cell)}
                            style={{ width: `${WIDTH_CELL}px`, height: `${WIDTH_CELL}px` }}
                          ></div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    </form>
  );
};
export default HomePage;
