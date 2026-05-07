import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Mahmoud Akram | Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO =
  "data:image/webp;base64,UklGRswfAABXRUJQVlA4WAoAAAAQAAAA2QIAFwEAQUxQSL8bAAABwOP+n9T+fzgC3ABxgL8s0f7/CcUcwA1KSipqulE6SkorHVmpyeZ+Gg6AFFep/kjusiOq7MlI/piZ9/s97xkbskUELNq26VZLM9p7W/HIIQeH+I7+f1tXXNt2mKZpaNtrcR4TV8ND29xjqOIT+D/NQ0Pd/eT9RzFolNuG9Lz9NGm8O2k/pG+/oPgQn680m6ZyW3W2NliBvuBt2PhM5fK03xCmtiqKyytGxbWd7LeR5+U8pbIVmUdrLzGX9nnS/qqydSlCbwQXW8O2Ol+PrY1RnTan6+tqbpNiu8nT6Vx9XUw+titxn2RxeoZqapI+UpoC+DDF8+zkTt87Hpti2pylPxoI42oIbItPzf9te6YocvEazkwGg64eE7cJTlAvF4M+k1LrTieol8ldn/h0enpJDT9yGOMtPju/dzFBpz05vcR6x20X5xPZS7Nnp8mcyV4eNkXGoZcz89fvE3NOZS+VTY1x6eV2Xvpu3xq+br1cTkeelvLg1st0Vp514zF0ejYuscahor+clV4awzcu3e2k9NLuuDo2Kz8nvdx5jMpX56SXyTikz8LL9YwkesHCyzM+KeHhpT0pYeIlPZ2JGoOX85noYZj7cD5TGLychyaGjGr44XT00prg42VLT097ldNvAj0jtfzOw8T8ZPQSs2pvFqfSBHpWFXzMa/Xv5hzkzsqGKt0+4twHIUT+xZAE5aI0wNkK38sE+np8y9a1z76T/8j57aqMZSh+CNTJv5UJ9JnSBtd9IZSr4aKoQFQ4Gjb6+aVMoM9XbXRz8m0gzRdlDcNpJlAXIY8J9J/psDj1ZVBrHZ5Xy2wwPv1kcx9mbXXyqyCzX5Q5ROtBBGvuQ9m9S7SSGTZ+/fJWV73ix68ytLN+Ff8aAVelDsG63dYvAjX3QS5m9SPHiL0lfoLbO0Rovop3AEsIcuPBbSy+2nPnpFkvVPpHoqzxGxPeMqPHr+J7iMsCwM2mtrCa+8D5cvWopiXXjhMBYvkmzgKiDABXWwchq7kPjGSZ6JW9Ds6vEpb6b+IbEDJAX3Ca+9DwIFk1zEmYAs5aU5FfDgpGgL5gNfch5lMNkaiPEhw/8c0Tni9CM/ch12B6+y0FjPrmCc8XoZn70GtN9CYR8cu/eMLyBT8vEwNWBNLCgqD74gnOF6ExW8k1gpEsfvOh52a25g6N2YrUGEcXv++d0NiGM/TSuqZDUZovKQpx5Im0cRJmaMxWFIrO6FujqA89k3lB+cCYrax7sIPqNQ556GlN0yY5eimckmicy619kux60kV+BLmYV7kMi9mKQCJBtxQHBlNZKaUapRSJrSz/tCxWSUUiRC1LIXDkAhSVUpbgSeaZkD9OJHTkpZSjUp2UIqOIpBAZMlY5AZl4uSx8RJvRljssZisSiTKf1Y3HpB6NZXEsjdO/d/HpCcilMe5zBxVFMf6U7BoygwM4iyOp+8VUH3Qk0i1tIr32NaokCuTEf9G/Z+MoUEWuM6RzfiUxbNzNsyaDYrbSYYtKYix4Ljxmvf0WM+9iWJsiJJFk3QK4M9WgufbWOJUjoHIQJnGFZEeNpAbaoPU5fOI/TuiTjsCqPpELIF9CRmOepRAUsxWFpTSZFzrwmEi4YlVbJEaggDYrZgGyVzd82KcL/MEonLTTlwgjm684I+TEcgWXHIQEapwBIzU89p2X47DqyQoBJBCZk2srFnBShLV4zjDwCUVNxFhGRO9pEpULuXzmyMqkS/CzQnr7YcujBHa56AjVVh38X/WEqqisprMSenRQQEoiMII6E8Z2UdikuMi+RViZkffRDmVV7yD3ZfC2V8LmyasufZKcdMTLFYCetnTscfWx1mxcD5tvSuBq/MR/bAUmLOnsNT3BsaANiNmKpLpqBBqn20OvbtAl1btbEU2IktRTTvzvQbG2pTPIxPaB/UCsetLjmd+nRuIR9oPYZVRAVeNEc3I54CB6EU78XyCsRkYdZqIH7IntvB6a484nxUk7qovrUC8RMOjSKlihUAfargeTCTO2NZUY6HSoabk+3KbSbtOjCajNkx2oJj3kqyesCUN07armrg0gVUSBvM2W2gmBGtgPwqonGQUjUeyUmVm7hV6OJS9mE5K2cGf7yLokWcNNtIFW3Pb+oTmCRFiIZGs1IrU3jC6hmHOaEQu44kCnA86d7bNt7tqhxYAkEndFErvEQLL6w8oSuUeR37fck+mQU8EG9n1/aE5PQpcQFQpjKfUHnXNkNAg/NYt7+qCT2oyd/Z2wRq+JzyX11V19QnBk3r87aGy4JtGOCNpJuT00J+XgE1IgFCBqOI+19gnJEW2wFqZ/c410Sfhmzvu2cS+M3PQLxZXEeRzZsXal6Fb/6J1knmPmwFPYto8RgglrMP1GdhStVJTHBK5dSClHJ8zJ+2ANPWudRfkIp69Ft+BYwaVbCFErKJ07UL9efiY75HLFEb4JPXw27kWMhCEoVOAF47GEiuK7cUk20jPvh+4XIPj4dtBcEKhSuvs1LhPKFfinW2powd/n+gwnWCcNwIQ1mIALgqanBDbrhKWQwp+/VZNTGiJMTY5rgNb7blEEEj56hNP+M6f08GE3dIUSrJMGYMLaDJTFHk0GjJlEibA0FmJqTDKFASf8Emfq28HY5x7iMVSY0u+UGb1SqQATvJN6/Lhs6OUvjUAFUmI8rmir8cwZETHKIIm4SJUIFpT8YiLmFAqrXCjBOqn/E9ZyKAmWDinEBGZaY0gQCBCju7jbTMeO0oyEEq6Tej9hrQSL24jvVRMwj6hbgUU0gkiCWOgWmR6X5ARFWEAJ10m9n7AmwdQ4VqQACArRCB6I2FrIWYHIARLCdVK2E9boUOCrlOHo4eItMEL6iUiCQcBO6vGENWz7bEZRw9un8ofsYyK4kbkjUCf1PQRkc0miSOB3mR6RltyMDB7wRC4ETaPe6U8omkVQgnlSRlt2HXCQXN98B0IcR1iMMIL/IbxlFm/gXBCs6Dw+UdHcJsMUsW26t9fY1Um9fdJZjWllLqiBT6z0zwT96MGDQH4RF6aEk++RQGiGpIT2h7SZYGl83C5OTurlk84QIoyfMZW9g4jSiL70KpD0aAEvgQWHQPIVJqHoIaLZG6pJI9yziR2c1NcnnSlMtS7eII+XILFX6XUgkRocX5Sly/p+wVBvUgNBWWKZLpcfxO1TI902pKTzi31eqmpBSc0KpkMhMSK1yr2NYRBB9LeOu49iwYg/WHdM3hdcxo2sYZatLWftB9WmCdzWxmQn9XvCGq526sHkuDjjyuLSy59F3YNJNIMrBpEIePaVuGzHdQUgW1Sr+rlaXnCZqPLpecWfdNrj6VJVeFW0hC/6gEIRzIIJKdJB3q3O5m12BAn1hGYjTO4A/mdqX1fQ36WqJI4ESk/RBis/BMnKs2SgjNQzz4kH2vQ+LlQn9Xepqg4q2zs3AikNYPprluDjrGRku7Q4i2/Ue038oE7wdoWeFFSZp0XsUQjIQoGedJPskZjiKIPP/s3Fu5svZkMmOIHTQe8q5EltfZfbUPi2VNWKlOAMxkijQiVr+MFXDMhO9s5dqehdwOlw8aI4aWHqu5xiHqSaymxFIySYZPivRF3hOvw4aYOWpqrIWUmMstUBjA43L/xJK3Mstwu3EBygTEikyYbAXWHliNoZNTcIJBw/oax3VyikA/joFq5eqJMaD8N+pLgtVeWUHDmdJcGRrG4QToDHd3QOrncJPM+HpiSiN6/Z+0mr3bkKd9LU3ns5ebLHAaLZswvS6G3FxTonf2U44UfdgEo40qiTYLIvRxeOmu54lQtXdX4ZmUlm8oqISUeHS3dBnRTSfXn1aKmqHn2FO6R994iMdelmcAUm/NhsyuDxLXH1Ro2rFvrI/KI8LHU+aWXv9pXw0CucsqWYk24AnrE/i9SX4HXlETXpYhE2bKxr2o89QhBzEwJRr/c45aLDCWIPrH/Js09BBLsnzG+3r9Hj/xnEGnFS0y4b7oay1fJ4G2hCgFw9iYyXpIm1my8zuFKiLAlFDBtCcwAeqR4XKYXcqCx8XgLkRaae0z74UrH8O9XOHNwGfF98WpMefjG8Uh8WqQdL8Iy8mawJOtZksjHbTfQ6eL2+ZsiEKlN8QY+axiQGp4rnkI0H0D06mPwms5p8ELUOentaOi/PCFHawQnZjDV6Y/DiUQg1TE9F6PCSPNaRXKFKgzVGM6J1WiMTumbg+K45TrEocZV6Dbo6QmFKhUSo2An6nx0ixrmCUdtL95x47gdcY1dWbhZDk6tHIYgVqacmM1IZLcGxNu+dBGwgnnTQHVj0yMq0hm9vIektByr3VnuZ6eyRAn5AfEK5rFvhLPttntClc87tpa1PfH8Hd/ulsBZAYfLiUQhJb92sCEKTkehYIzYMY1v3OrNuPmSp4Tu9gO22RSzwLYmUC0rUTAVb5ai0qAy1gRdAcGNNcfFL2PL+c2c4Dy6d0CTuPKlXWN5/D67/7QOpsaW52Xq1SH1SS6VGKZB7ZZllRhhriMhKqX5cL23iLEZghMvuJ47whL5vrWfpc2h8R5mBC7bSswLveSeXuxgjXVZ36v2us1pzGr/FpX4XX61UR7mppOT9evWyTKw3YFlnnBbG4fevG6zAxcy8FJrLTM9EiOioun1fN7MTFntMlrRmL3d2u5s6K9xVu3ZQZcTK0z5bgdvups4KBjY8kK3h1Kq5cFuk3jUnxt/AYcgGEimOXkyPpzwnKDQfthjV0XMHPOCa2e6mzglazci1lnrcWtwA+6Pjtq/RU4JJc3IpqtlwASx2yezxlKcEmhUDqqunAUx5P71CuGgeDlT/x1YmyGKXZ1cIV2ZMqIF90JT3kyuEVvN9a+FRas+yEAZuPCHdmJbK3Gq2wiyE08onSGm3j42CDF+5hXB28cQM7MemQnCOhaD5uQY7sG81W+EWwtnFFsM7MgdYIeAWwsmFbuE2Xk9gIWD2eMqziy1GWNDCur+5bUzjrAJQSCq76s+w+xtgKXB2oVO4BS2w+5tZz9L1rAKgZv8dxIKWawipIYTTCnsh+StrfC7A7m9uG9M4E+ao8WTa8buQ7pozLYSJ6dv1nV9ASpoPIZxV2NdV+3fIEyx8COF0Aqrv/NpKHUU+hHBaYSskf2DlL6PoRAvh9oKzl19a+acoOtFCaNmir8AvfhlFsBAe3EI4rbD0tPy1lT+AP+bmjAqh4QRsDP8vrPw6is6zEAqOmOv/37by77tbFftZxsXZxXYBTVz+rSjyI4TzCoM2AunL/B3E1na4bUzjxDDF4q31exJCfMKxcddc2gCHkAuRHD2MtwRPQkjDyO5Zf7P8Tv8xeUfLfcyyCmoImTI++/QIMrHXXB6BCwGzF4L+AKJjjOYSf74QcJt8kF/osL4/GE0AP3gIyM1miOOGeX4D72GiVPtutpLV8v0Z2QIAdkcy6vs0WPEHoz3hRwuhNt4C1j7DvQNc/nUOfnqE8YbAfJgo9nmRerHQ7S4k0xDk8aMCaS48DMRB64J7B2hbOUsOLnsg1LdJ7BHm9imvYSLcrYc1dLvOqoGU3zCRh2yvcu1NCA/vDsqXPKboiwfNzcHLEHoNZs2/diYPaWDJf/IyNEl9nLBWYvJ5PtDcX+CGiQL7eEqaLbrKb527j39iS/YlzCF0GsWafem0PmHsKuE/TFT5ZraSYDO6O8602JvWNcQhSCxr8p3T+MjjDZSBeIAfT4nf1Wr9nVP4iI6xd60mvI+nFBqNOr4Y9RwPholitiG42lJw9pVz8ZIbWiFrmTVcBh9+TUAXKsSHs2v0kifBVjICu0i9pGBxQY6YTC8ENVkppRqltCYk6Qxb47WnGBSVUpbg8pcJ+eNE8tlBl5iryTowrBvTmElyuiQmkfO7ZbmAzrNXmaVoSPW2iVcB3aqrcfBqLCEbQO6txXW0b5C37EwZq2RmTZZxs7lLl38BVAR9hEFdpD7XJIy0yNUUmQw4z36VRFsoznr7mOy8K3a1KUISMI/f+KEcAdkjTDkOSVb9sYf1zfcC9DBRSBep74myOqOkRxhy5ZCiliiE1VdiVs8sBai2dI8K4HTnpd7HD/yhVsBI5QHjfn34YEFLYR0Y0kXqVyIkIb3dJgA6z36t90a74JcA9+73wqq2zeB5/IvpF5A5SuWCyOFgMXliw3LBWwc+o3AuVVVrCCvoxxSAo6TgDYkxgVijz4D2NGnjYyaM6aJQkeqDwd1G+7bFKL7Yhm2wBuLBXKRegQ6YNAsqBCbGNSB9JUQDq+G6GUURqImlKoSv1sbgyVD/RDKwE8qlqjKYROUwMSMAbobb01blo4tDr/t3Pk6GicmX5uxbNqANxAO5VFUHoobp/GtCg9IIBSqjuqLWg7JZnbASqzxgXPhirLsJhokCuVTVAhNQoETXJHSo6kdQ4UafEW/pYoUKEg/uRrXGSTa+hbDFHs1Om6EiPVNQaibkq//oOgg0wMsXP/kBKbieDBO13EMYocYpCVA1wJOtOCQhs3aD5MUcJCNDb2wPY28GduKN84Q1cMkRYKHu0MAXlFhoWX6KRgjQWbDg3JluHGmnGCYK4FJVEli1gxX1FQ28udnT0kXJGgZkiEgNgzVMMXa5eBPCZAjBl1+PCGW5RoIoCIKUNXuVjDAw+kNatLfp3d3a6wUEQO5a5jw90skLzmYrAlNLrkgpk8T9G2DAhXZ1SIC/SKs7oN6f2gueiKsXo7pNEkLoJqz1mAbqCFR6nbBme6iOWgcC7QFx9YB3i1RvSkYFgbkXo/JOM0wUtglryQpvZ4IFWzqhjghZxE9R/pSkN5yWvg2vnz8gku6JlzuVTh62CWs1qp2ZAUXeBTKiY5UJagRzllKOTljrLMpHOH0tusVLYooNwZg0HbNO7YeXjWw0PmgT1macwd4CjBQ9fUTGXL9bDZTQcvGe4GykZ35PTQdNzVt8k9lDGpoCAYS5F6N004QQpglrOAOSZEeHKyCS8CBi7QAtB7C5eE3OPsIKpaAlq2+kk9bu8MRLS/bo9oBNWOuQfRElrrxJuoMA+2xJhe7UHjHgclHidLrOM6qNhyXJlSXGepsqhHDtcWDFCi8QSUsfkbBKgsxYzDc4YhTRY09Kv7ixEfSJ9YtuHk6AJqw5nSAw73AzG5lowXuCVVZGjgifiO+aDSlLjBqJlyGkfBgdZXZOyZqT8HMQ3Aos0Q878YOTcnLjCNly8YbMuwTKbCXTjuhJ/5gTC7gJYUjhtkRfeAPbgw3c52I+oogshDBNWJOuWBPSSM8ElDREn4OJWf9244cFLX4l7yA96Wxxltk1sxMl9jvYZ2Ng16B8MqYiXIEnRGYrpXaGIr7RSDSA/CBoA8iAU2l2FAwxtkn9CoGZ2UrvMLczYhWqRqKIkB/C20XzwJcQnpQmVGF50pnzCeYdMTqnZiboRw83DyZaN/sQjMaxfoXAymxFumSht54lZkS/qcDCxcIE02dx40tD2ZESELMVDqvdlGDpneHh0SKxPfK9Djap5gL7EIx92p6FMPGx78q1U0Yw8MQoWgRu6D8bdbiZ2OBNCBvpCjyBMVvpHWd3BpVehG7UU4KYpLb08mfh+nBTaDb4E0JBakIVFLOVZHWMhEvvDI8oAurCHnImHrRkRZVNGj0LId6YdM3X2jELnBwh8pSUn4mCs5RPXJn8M6GqmGhVo/PszuDSK8EoSqLlIzFwwp8QYv9MqB48UrE6RyKkF66C55TIT0SsHWMZP+EfgtEUxdsQYpcI7ZwRDmJJQUlJsn4gKlaaiT8h3Dw0oXpy+LN2z4yRXkndQwnMlg/EnbnO3TDl4aEJVev4T5TUdxLmoGoNSnoVEEVKpBxRB4zYgyf78nQpbxMqZEuFHQs0jiVUhDFkKxgBXbUP+C8XgNPlMUxnAYMpmFJ5uGmjJ2lzgbSUSNJW7izoV4qQLygTm5O/MjgSZ8DVGZLJfj3BG//qe+LJQG1Cxer6NA7JaBeq7oGFBye9I3jODulzaEoMmGWXYVOFcH2YNa7W6Fkx8aEAk/Lk6eEKPFcOdoszmaYNr4JLWKnJUErMCi2bCyJmatqP/Ts97mlVHWgeEa7WEKwe3M5MMfEphAtjEyp0xTC5pKSVIAXTEASuci2h95EMOvuSw5fZOxlUyYJHqsdFSrE6Uka0L3wK4Uq9aaOYUdWzOY36CNl8Fwh4UzQH1b1rhkrW8l4tS9pV3xMFZhYLOM86SHJ3Dp9REqCesaJggLl96FMIrYcr8Ewceg2SGbBuA9TBuvFqWMxLW7KgZt29PbFIJ6G9O4k1RrPltgbcFwEio+D/qqPQQKEePPlDcZtKOeH2NdqlFPdaLcuxwiS0RpXYJQdW2CP8MO+dBGwgnnTA6Ce9ZdUrVF6s9jLT2SLFi9YPCpZ4uPO/O5MOnnoxSina5cqkFWcg1WGGKA2mwtCbS45Q+2IG8QHdMAx4rdhM7VfZtLhyMSUXlBeoPWaIxbgXlBAT3Tni4TKuLRv7l/JtHzhKJiRxFLs4WoQt221ip4Qmq1NKjdIunlktX45UfxZSqh/XWyMrxlEKTHLBBVTpWXXQVOdyH+Mwk3pMYfLCiG/VBQ1fkkc/UDMYvLD5d3w2EPPzUryg98LmJ4eJxheiq79EDRsvj8NFwRBfzFZS0qLAxct+p65HnNsLn7z8ZK1nXi4G25fj5DzqJWmZYJZrHl4cKFPtgeLJS+P2yMvwA0cvJEMB1YHizgcCFePKA7Nce+ZlM+yz5Hh7fJAUXna/dOKlcsfV8MsDxYX/L3k+LvvpoH3ufi7m3TTj7Th/YenK88CLO7keCGJM1qN0PVTcmLD5svC92c7PlZfCEYPp7+P950DVa8/yb3Iz2oer9+Pxt08VeOHJjcnpvPXJbaSHPenBouLl24/O9C12e0vcUgcUlq3nHu0fV4TCyYLWdTtmoid+Gt+P1ptfCvedz7vLctHQ/8/4frzfrqSCvfF9Jxx73S7OKpz0gFE4A6hX8B3ch1sKOrlNPWijfoUV5eNstJL68WwHDmM06eakCrhspr0MHDLijYda4skJByYNmcHFoS/HjKjg8T9KKXX7Py73xCGmb9Q30VFzrV8yXjkA0eh0eJt6pNQDWkN03Nzgl4w3DgDPN3B6m9oIKv/0NSoM/tExHtwv/Cq/FbMxgwn7z3YzHvGhI374JeMDm8O1BjZgPlRPbTuO9mtz2fV3c3Twe+kBqMTFr0/W4+i97k7bkR6cbKu4GjE8GmvuxdfB1ml0PxIH6wqcVRVaEAf6xHRjM+jt3O7ttbi8/BZFcwPcMW/RMXTXjZKW/a52OdfX8USs6B0F55GUPwqvdiK9Xb3aAvX3/zPft1G8NWwK8J2GgaNYxwOR6lVEx9LFLf7D1nIS8WIi+JRyvSsOBJ+q6Hi6uHniBK3hVnUXONHe3j+x/YCrOh5H4hM7Md+g/7ldWIp28wBr11XMveqowAneXtl7ZN2lnTbbd/eGsZyl1fC0Md2usR/3RUCC9dReogPs4qJo31xTeNGIeyVyn8rUt9yt2vY+TdOtbV8pPrHd/6NEBABWUDgg5gMAAFBhAJ0BKtoCGAE+MRSJQyIhIRXPxAAgAwS0t3C6nwB/K/W1oA/QD+AI7ett+AP4B+AH6AfwD9/e/wZ41tIlnGH4i5HuuM2oCbW0iqzUBNraRVZqAm1tIqSLSBlko5MAAWTgIn/I9KW10G1tIqs1ATa2kVWagJtbSKrNQEzQNC4gHi9yIUVYBxxNraRVZqAm1tIqs1ATa2kVV2cdAemYrGcn5Q6AWgm/vMt1Uj0BKfvx3WJKC38r8dNraRVZqAmW8pa8n20ipBxmcBxUGDdC3hguPuAwjpx4vJciRe/r8XMOSpB0xW5r/wqWpBbMPCrR2P3pK4RzaHySwrUW0iquxUhQnIQ2XJ+BCrYBH9D1V42LvNqAm1ndNzOJcq3MiLRsb7eIENAuB554ruzmmW/9tYKATa2kVWagJtZZTjQzc4HkpN/PECdR+T96sTMm0O7mMyXD0Do2Y5Lttp2z6SP8o9RbeBONMzoKqzT8CVM52rSbl45YHaRIklUeLIizIi0bf+XMJzNUnDg4UZKtwLUOUDQjHMRJTep0Lmv+uxGp1fIzy4Hcz7dO5BVVtmvqCKkKE5CBzdMvMST7ze8Dg3eM2oCbW0iqzUBNraRVXcXNqAcfw9vvYm/gLt6aUd/HZVFtG0JBALzuDzELBbSKrNQE2tpFTQ9Vmn64lARSAH4W8MFx9wGbnm+ykDkBwVF6iRBTp/lN6nQuaxhoTrjKko9ADRxm9Ta2jp85/8jHOYkYUX8nijNE4A/WJy7cdouPGbW0iqzUA/joM349T8vldC2cZsP0WPxu7CC3GRVAP0xMFImalqFtIkr0nfjqRoD7glYId3YZgF7FKCu5i+bQQlI2eKqTI2qlxNCYBysqiB/EjkkjBi67jPw9VNvOqrf0Kb9KzaKrNQD8xxCPhoM1GcCf+QnROju19XjGbqFos/jd+x/kL6mCdbvFUCueb7KOmm3HJ+9WJvW9uXCbjlQW3EYiPnIvaAm1tIqs1ATa2kVWaflyfgY6oGmEKnHB2Le4ZqZKizuaTn+qAm1tIqs1ATa2kVWaUAAA/vS3rVx///9qfP//k21rj///7U4gUn5Llfk9D8mVB1ehy/jnAAApvyVZfkq9/Ji35J3V+zsAbX5J5z8livyWi/JaL8k4AUv5J3l9aQ7PyaU/yaq/kw716osfycW/Jof/Jxf8nAPyb2/JnEfkyoHV+TKgZv5MvH+S3f7OwEk1///8MEVn5JxH/yThV/knUMN+6KXX5Mqvfyavfk12//k2OfrZw0Pya1/k0f/kyoCi3afyj///b3v//7f6n+TSr+TWn8ljPyZWA/k0j/k1Z/a6qAAA";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 86px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -178,
            right: -92,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(38, 7, 220, 0.28)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -178,
            left: -84,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(113, 72, 212, 0.24)",
            filter: "blur(60px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 16 }}>
          <img
            src={LOGO}
            alt="Mahmoud Akram logo"
            width={90}
            height={90}
            style={{ objectFit: "contain" }}
          />
          <span style={{ color: "white", fontSize: 76, fontWeight: 800, lineHeight: 1 }}>
            Mahmoud Akram
          </span>
        </div>

        <div style={{ color: "#C9B8FF", fontSize: 42, fontWeight: 700, marginBottom: 24 }}>
          Web Developer
        </div>
        <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 30 }}>
          Built for Speed. Designed to Impress.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 86,
            right: 86,
            height: 6,
            borderRadius: 3,
            background: "linear-gradient(90deg, #2607DC 0%, #ffffff 50%, #7148D4 100%)",
            opacity: 0.82,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
