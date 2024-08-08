let slider = document.getElementById("slider");
let size = slider.value;
const thegrid = document.querySelector(".grid");
let bgcolor = document.querySelector("#bgColor");
let inkcolor = document.querySelector("#penColor");
let eraser = document.querySelector("#eraser");
let cocktail = document.querySelector("#rainbow");
let toggle = document.querySelector("#toggleLines");
let clear = document.querySelector("#clearGrid");
let toggleflag = true;
let ink = "#000000";
let random = false;
let MDOWN = false;
thegrid.setAttribute("draggable", false);

creategrid(size);

let cells = document.querySelectorAll(".cells");

function creategrid(x) {
  let area = 730 / x;
  for (let rows = 0; rows < x; rows++) {
    for (let columns = 0; columns < x; columns++) {
      let cell = document.createElement("div");
      cell.classList.add("cells");
      cell.style.width = `${area}px`;
      cell.style.height = `${area}px`;
      cell.setAttribute("draggable", false);
      if (toggleflag) {
        cell.style.outline = "1px solid #000";
      } else {
        cell.style.outline = "none";
      }
      cell.style.backgroundColor = `${bgcolor.value}`;
      thegrid.append(cell);
    }
  }
  let cells = document.querySelectorAll(".cells");

  bgcolor.addEventListener("change", () => {
    cells.forEach((cell) => {
      cell.style.backgroundColor = `${bgcolor.value}`;
    });
  });

  inkcolor.addEventListener("change", () => {
    ink = inkcolor.value;
    random = false;
  });

  inkcolor.addEventListener("click", () => {
    ink = inkcolor.value;
    random = false;
  });

  cells.forEach((cell) => {
    ["mousedown", "mouseup"].forEach((eName) =>
      cell.addEventListener(eName, () => (MDOWN = !MDOWN))
    );
    cell.addEventListener("mouseover", () => {
      if (MDOWN) {
        if (random) {
          cell.style.backgroundColor = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
        } else {
          cell.style.backgroundColor = `${ink}`;
          console.log(ink);
        }
      }
    });
  });

  eraser.addEventListener("click", () => {
    ink = bgcolor.value;
    random = false;
  });

  cocktail.addEventListener("click", () => {
    random = true;
  });

  clear.addEventListener("click", () => {
    cells.forEach((cell) => {
      cell.style.backgroundColor = `${bgcolor.value}`;
    });
  });
}

toggle.addEventListener("click", () => {
  let cells = document.querySelectorAll(".cells");
  if (toggleflag) {
    cells.forEach((cell) => {
      cell.style.outline = "none";
    });
    toggleflag = false;
  } else {
    cells.forEach((cell) => {
      cell.style.outline = "1px solid #000";
    });
    toggleflag = true;
  }
  console.log(toggleflag);
});

slider.oninput = function () {
  size = this.value;
  const gridtext1 = document.querySelector("#gridSize1");
  gridtext1.textContent = `${size}`;
  const gridtext2 = document.querySelector("#gridSize2");
  gridtext2.textContent = `${size}`;
  deletegrid();
  creategrid(size);
};

function deletegrid() {
  while (thegrid.firstChild) {
    thegrid.lastChild = null;
    thegrid.removeChild(thegrid.lastChild);
  }
}
