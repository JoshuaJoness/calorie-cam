import React, { useEffect, useState } from 'react'
import Svg, { Path, G, LinearGradient, Stop, Rect, Defs, ClipPath } from 'react-native-svg'
import { Animated, Text, View, StyleSheet, Button } from 'react-native'


const StatsImaGe = () => {
    return (
<Svg width="250" height="250" viewBox="0 0 696 625" fill="none" xmlns="http://www.w3.orG/2000/SvG">
<G id="undraw_Private_data_re_4eab 1" clip-Path="url(#clip0)">
<G id="stat2">
<Path id="Vector" d="M56.9727 353.615H125.95L160.438 293.879L125.95 234.144H56.9727L22.4843 293.879L56.9727 353.615Z" fill="#F2F2F2"/>
<Path id="Vector_2" d="M134.693 374.799H48.2296C47.3521 374.797 46.4905 374.566 45.7306 374.127C44.9707 373.688 44.3393 373.058 43.8994 372.299L0.66777 297.419C0.230369 296.658 0.000183105 295.796 0.000183105 294.919C0.000183105 294.042 0.230369 293.18 0.66777 292.419L43.8995 217.54C44.3394 216.781 44.9708 216.15 45.7306 215.712C46.4905 215.273 47.3522 215.041 48.2296 215.04H134.693C135.57 215.041 136.432 215.273 137.192 215.712C137.952 216.15 138.583 216.781 139.023 217.54L182.254 292.419C182.692 293.179 182.922 294.042 182.922 294.919C182.922 295.796 182.692 296.658 182.254 297.419L139.023 372.299C138.583 373.058 137.952 373.688 137.192 374.127C136.432 374.566 135.57 374.798 134.693 374.799ZM48.2296 217.04C47.7031 217.041 47.1861 217.18 46.7302 217.443C46.2742 217.706 45.8954 218.085 45.6314 218.54L2.39984 293.419C2.1374 293.875 1.99928 294.393 1.9993 294.919C1.99932 295.445 2.13747 295.963 2.39995 296.419L45.6314 371.299C45.8954 371.754 46.2742 372.133 46.7302 372.396C47.1861 372.659 47.7031 372.798 48.2296 372.799H134.693C135.219 372.798 135.736 372.659 136.192 372.396C136.648 372.133 137.027 371.754 137.291 371.299L180.522 296.419C180.785 295.963 180.923 295.445 180.923 294.919C180.923 294.392 180.785 293.875 180.522 293.419L137.291 218.54C137.027 218.085 136.648 217.706 136.192 217.443C135.736 217.18 135.219 217.041 134.693 217.04H48.2296Z" fill="#CCCCCC"/>
<Path id="Vector_3" d="M91.4611 260.903C84.9389 260.903 78.5632 262.837 73.1402 266.46C67.7173 270.084 63.4905 275.234 60.9946 281.26C58.4987 287.285 57.8456 293.916 59.1181 300.313C60.3905 306.71 63.5312 312.586 68.1431 317.197C72.7549 321.809 78.6308 324.95 85.0277 326.222C91.4245 327.495 98.055 326.842 104.081 324.346C110.106 321.85 115.257 317.623 118.88 312.2C122.504 306.777 124.438 300.402 124.438 293.879C124.438 289.549 123.585 285.261 121.928 281.26C120.27 277.259 117.841 273.624 114.779 270.561C111.717 267.499 108.082 265.07 104.081 263.413C100.08 261.756 95.7917 260.903 91.4611 260.903ZM91.4611 270.796C93.4178 270.796 95.3305 271.376 96.9574 272.463C98.5843 273.55 99.8523 275.095 100.601 276.903C101.35 278.711 101.546 280.7 101.164 282.619C100.782 284.538 99.8401 286.301 98.4565 287.684C97.073 289.068 95.3102 290.01 93.3912 290.392C91.4721 290.773 89.483 290.577 87.6752 289.829C85.8675 289.08 84.3225 287.812 83.2354 286.185C82.1483 284.558 81.5681 282.645 81.5681 280.689C81.5681 278.065 82.6105 275.549 84.4657 273.693C86.321 271.838 88.8373 270.796 91.4611 270.796V270.796ZM91.4611 318.422C87.553 318.404 83.7082 317.433 80.2603 315.593C76.8124 313.753 73.8655 311.099 71.6751 307.863C71.8337 301.267 84.8658 297.637 91.4611 297.637C98.0564 297.637 111.089 301.267 111.247 307.863C109.054 311.097 106.107 313.749 102.659 315.588C99.2121 317.428 95.3686 318.4 91.4611 318.422V318.422Z" fill="#FFE8D6"/>
</G>
<G id="stat3">
<Path id="Vector_4" d="M56.9727 139.615H125.95L160.438 79.8794L125.95 20.1437H56.9727L22.4843 79.8794L56.9727 139.615Z" fill="#F2F2F2"/>
<Path id="Vector_5" d="M134.693 159.759H48.2296C47.3521 159.757 46.4905 159.526 45.7306 159.087C44.9707 158.648 44.3393 158.018 43.8994 157.259L0.66777 82.3789C0.230369 81.6183 0.000183105 80.7563 0.000183105 79.8789C0.000183105 79.0015 0.230369 78.1395 0.66777 77.3789L43.8995 2.49997C44.3394 1.74081 44.9708 1.11039 45.7306 0.671692C46.4905 0.232989 47.3522 0.00136431 48.2296 -3.05176e-05H134.693C135.57 0.00134794 136.432 0.232957 137.192 0.671661C137.952 1.11037 138.583 1.7408 139.023 2.49997L182.254 77.3789C182.692 78.1394 182.922 79.0015 182.922 79.8789C182.922 80.7563 182.692 81.6183 182.254 82.3789L139.023 157.259C138.583 158.018 137.951 158.648 137.192 159.087C136.432 159.526 135.57 159.757 134.693 159.759ZM48.2296 2.00002C47.7031 2.00085 47.1861 2.13981 46.7302 2.40303C46.2742 2.66625 45.8954 3.04451 45.6314 3.50002L2.39984 78.3789C2.1374 78.8353 1.99928 79.3525 1.9993 79.8789C1.99932 80.4054 2.13747 80.9226 2.39995 81.3789L45.6314 156.259C45.8954 156.714 46.2742 157.093 46.7302 157.356C47.1861 157.619 47.7031 157.758 48.2296 157.759H134.693C135.219 157.758 135.736 157.619 136.192 157.356C136.648 157.093 137.027 156.714 137.291 156.259L180.522 81.3789C180.785 80.9225 180.923 80.4053 180.923 79.8789C180.923 79.3524 180.785 78.8352 180.522 78.3789L137.291 3.49997C137.027 3.04447 136.648 2.66621 136.192 2.40298C135.736 2.13976 135.219 2.00079 134.693 1.99997L48.2296 2.00002Z" fill="#CCCCCC"/>
<Path id="Vector_6" d="M91.3976 56.9075C89.7661 55.1954 87.8133 53.8214 85.6508 52.8641C83.4882 51.9068 81.1582 51.385 78.7938 51.3284C76.4295 51.2718 74.0772 51.6815 71.8713 52.5342C69.6654 53.3869 67.649 54.6658 65.9375 56.2979C64.2259 57.93 62.8527 59.8833 61.8962 62.0463C60.9398 64.2092 60.4188 66.5394 60.363 68.9037C60.3073 71.2681 60.7179 73.6202 61.5714 75.8258C62.4249 78.0314 63.7046 80.0473 65.3373 81.7582C65.5341 81.9646 65.7357 82.1662 65.9421 82.363L92.0098 108.431L117.465 82.9753C120.788 79.4912 122.615 74.8459 122.558 70.0321C122.501 65.2183 120.563 60.6178 117.159 57.2136C113.755 53.8095 109.155 51.8718 104.341 51.8146C99.5269 51.7574 94.8816 53.5853 91.3975 56.9075H91.3976Z" fill="#FFE8D6"/>
</G>
<G id="stat1">
<Path id="Vector_7" d="M56.9727 569.615H125.95L160.438 509.879L125.95 450.144H56.9727L22.4843 509.879L56.9727 569.615Z" fill="#F2F2F2"/>
<Path id="Vector_8" d="M134.693 589.839H48.2296C47.3521 589.837 46.4905 589.606 45.7306 589.167C44.9707 588.728 44.3393 588.098 43.8994 587.339L0.66777 512.459C0.23024 511.698 -2.10565e-05 510.836 1.44422e-09 509.959C2.10594e-05 509.082 0.230326 508.22 0.667892 507.459L43.8995 432.58C44.3394 431.821 44.9708 431.191 45.7306 430.752C46.4905 430.313 47.3522 430.082 48.2296 430.08H134.693C135.57 430.081 136.432 430.313 137.192 430.752C137.952 431.191 138.583 431.821 139.023 432.58L182.254 507.459C182.692 508.22 182.922 509.082 182.922 509.959C182.922 510.836 182.692 511.698 182.254 512.459L139.023 587.339C138.583 588.098 137.952 588.728 137.192 589.167C136.432 589.606 135.57 589.838 134.693 589.839V589.839ZM48.2296 432.08C47.7031 432.081 47.1861 432.22 46.7302 432.483C46.2742 432.746 45.8954 433.125 45.6314 433.58L2.39984 508.459C2.13734 508.915 1.9992 509.433 1.99922 509.959C1.99924 510.485 2.13741 511.003 2.39995 511.459L45.6314 586.339C45.8954 586.794 46.2742 587.173 46.7302 587.436C47.1861 587.699 47.7031 587.838 48.2296 587.839H134.693C135.219 587.838 135.736 587.699 136.192 587.436C136.648 587.173 137.027 586.794 137.291 586.339L180.522 511.459C180.785 511.003 180.923 510.485 180.923 509.959C180.923 509.433 180.785 508.915 180.522 508.459L137.291 433.58C137.027 433.125 136.648 432.746 136.192 432.483C135.736 432.22 135.219 432.081 134.693 432.08H48.2296Z" fill="#CCCCCC"/>
<Path id="Vector_9" d="M112.696 489.902C112.696 501.63 91.4612 527.376 91.4612 527.376C91.4612 527.376 70.2258 501.63 70.2258 489.902C70.2236 487.113 70.7706 484.351 71.8356 481.774C72.9007 479.197 74.463 476.855 76.4332 474.881C78.4035 472.908 80.7432 471.342 83.3187 470.272C85.8942 469.203 88.6551 468.651 91.4438 468.649C94.2325 468.647 96.9943 469.194 99.5715 470.259C102.149 471.324 104.491 472.886 106.465 474.857C108.438 476.827 110.004 479.167 111.073 481.742C112.143 484.318 112.694 487.079 112.697 489.867L112.696 489.902Z" fill="#FFE8D6"/>
<Path id="Vector_10" d="M91.4611 498.244C96.0686 498.244 99.8036 494.509 99.8036 489.902C99.8036 485.294 96.0686 481.559 91.4611 481.559C86.8537 481.559 83.1187 485.294 83.1187 489.902C83.1187 494.509 86.8537 498.244 91.4611 498.244Z" fill="white"/>
<Path id="Vector_11" d="M90.7027 551.11C95.3101 551.11 99.0452 547.375 99.0452 542.767C99.0452 538.16 95.3101 534.425 90.7027 534.425C86.0953 534.425 82.3603 538.16 82.3603 542.767C82.3603 547.375 86.0953 551.11 90.7027 551.11Z" fill="#FFE8D6"/>
</G>
<G id="GirlBody">
<Path id="Vector_12" d="M497.007 231.443C489.91 228.142 481.196 227.059 473.975 230.127C466.754 233.195 461.83 241.059 464.166 248.018C465.224 251.173 467.635 254.276 466.696 257.463C465.973 259.916 463.451 261.535 460.973 262.687C458.496 263.838 455.787 264.806 453.995 266.748C452.204 268.69 451.83 272.034 454.068 273.54C454.805 274.036 455.727 274.271 456.442 274.794C457.051 275.289 457.491 275.962 457.699 276.719C457.908 277.476 457.875 278.279 457.606 279.016C457.01 280.5 456.025 281.796 454.755 282.767C452.215 284.958 448.857 287.465 449.646 290.576C449.939 291.407 450.427 292.155 451.071 292.757C451.715 293.359 452.494 293.797 453.343 294.034C455.106 294.542 456.935 294.783 458.77 294.75L533.736 297.111C536.211 297.297 538.699 297.158 541.138 296.698C542.323 296.482 543.451 296.023 544.451 295.351C545.451 294.68 546.302 293.809 546.951 292.793C548.386 290.136 547.444 286.862 545.671 284.381C543.898 281.9 541.389 279.942 539.316 277.664C537.242 275.386 535.546 272.541 535.911 269.597C536.204 267.239 537.759 265.202 538.875 263.06C539.991 260.918 540.639 258.241 539.194 256.271C537.157 253.494 532.267 253.745 529.951 251.158C528.203 249.206 528.54 246.395 528.367 243.877C527.949 237.82 523.756 232.1 517.786 229.444C514.751 228.141 511.45 227.579 508.154 227.803C504.859 228.028 501.664 229.033 498.833 230.735L497.007 231.443Z" fill="#2F2E41"/>
<Path id="Vector_13" d="M449.634 611.598L437.893 608.07L445.912 561.103L463.241 566.31L449.634 611.598Z" fill="#A0616A"/>
<Path id="Vector_14" d="M449.209 623.879L411.351 612.504L411.495 612.025C412.076 610.09 413.033 608.288 414.31 606.723C415.588 605.158 417.161 603.859 418.941 602.902C420.72 601.945 422.671 601.347 424.681 601.144C426.691 600.94 428.722 601.135 430.657 601.716L430.658 601.716L453.781 608.664L449.209 623.879Z" fill="#2F2E41"/>
<Path id="Vector_15" d="M560.431 611.995L548.171 611.994L542.339 564.706L560.433 564.707L560.431 611.995Z" fill="#A0616A"/>
<Path id="Vector_16" d="M563.557 623.879L524.027 623.877V623.377C524.027 621.357 524.425 619.356 525.198 617.489C525.971 615.622 527.105 613.926 528.533 612.497C529.962 611.069 531.658 609.935 533.525 609.162C535.392 608.389 537.393 607.991 539.413 607.991H539.414L563.558 607.992L563.557 623.879Z" fill="#2F2E41"/>
<Path id="Vector_17" d="M543.412 576.229C542.343 576.228 541.308 575.846 540.494 575.152C539.68 574.458 539.14 573.497 538.971 572.44L520.768 458.886C520.647 458.134 520.284 457.441 519.735 456.914C519.185 456.387 518.478 456.053 517.722 455.964C516.965 455.875 516.2 456.035 515.543 456.42C514.886 456.804 514.372 457.393 514.079 458.097L466.918 571.633C466.479 572.681 465.661 573.525 464.627 573.997C463.593 574.468 462.419 574.532 461.339 574.177L444.305 568.498C443.245 568.148 442.353 567.415 441.804 566.442C441.255 565.469 441.09 564.326 441.339 563.237L479.988 392.216C480.177 391.392 480.593 390.638 481.189 390.038C481.785 389.439 482.537 389.018 483.36 388.824L535.192 376.792C535.829 376.647 536.49 376.641 537.13 376.774C537.769 376.907 538.373 377.175 538.9 377.562C573.03 402.36 570.147 483.383 563.786 571.359C563.707 572.461 563.225 573.494 562.433 574.264C561.642 575.033 560.595 575.485 559.492 575.533L543.61 576.225C543.544 576.227 543.478 576.229 543.412 576.229Z" fill="#2F2E41"/>
<Path id="Vector_18" d="M499.781 296.531C513.345 296.531 524.342 285.534 524.342 271.969C524.342 258.405 513.345 247.408 499.781 247.408C486.216 247.408 475.22 258.405 475.22 271.969C475.22 285.534 486.216 296.531 499.781 296.531Z" fill="#A0616A"/>
<Path id="Vector_19" d="M500.841 399.267C494.945 399.229 489.131 397.885 483.817 395.332L483.635 395.247L483.562 395.059L461.533 337.982L461.114 328.065C460.973 324.749 461.529 321.44 462.745 318.351C463.961 315.263 465.81 312.463 468.174 310.133C470.537 307.802 473.363 305.992 476.468 304.82C479.573 303.647 482.89 303.138 486.204 303.325L509.592 304.643C515.633 304.986 521.316 307.619 525.485 312.005C529.653 316.392 531.993 322.202 532.028 328.253C532.636 329.42 536.95 338.545 528.495 347.118C528.179 349.07 525.222 369.365 536.382 380.525L536.696 380.839L536.422 381.188C536.244 381.414 521.911 399.264 500.841 399.267Z" fill="#CCCCCC"/>
<Path id="Vector_20" d="M533.683 403.572C535.065 403.071 536.32 402.273 537.361 401.234C538.401 400.196 539.201 398.942 539.704 397.56C540.207 396.179 540.401 394.704 540.273 393.24C540.144 391.775 539.696 390.357 538.96 389.084L562.319 362.041L543.904 359.644L524.546 385.692C522.49 387.07 521.011 389.155 520.389 391.551C519.767 393.946 520.046 396.487 521.172 398.691C522.299 400.895 524.194 402.609 526.5 403.509C528.806 404.408 531.362 404.431 533.683 403.572V403.572Z" fill="#A0616A"/>
<Path id="Vector_21" d="M490.872 397.875C489.403 397.944 487.937 397.689 486.578 397.13C485.218 396.571 483.998 395.72 483.003 394.638C482.007 393.556 481.262 392.269 480.818 390.868C480.373 389.466 480.242 387.985 480.433 386.527L448.476 370.535L464.556 361.247L492.437 377.857C494.865 378.339 497.031 379.695 498.526 381.668C500.02 383.641 500.739 386.094 500.546 388.561C500.353 391.029 499.262 393.34 497.479 395.056C495.695 396.773 493.345 397.776 490.872 397.875Z" fill="#A0616A"/>
<Path id="Vector_22" d="M548.287 382.699C547.41 382.699 546.552 382.442 545.819 381.959L534.266 374.382C533.294 373.747 532.606 372.762 532.346 371.631C532.085 370.501 532.272 369.313 532.867 368.317L541.23 354.266C541.683 353.505 541.97 352.658 542.071 351.779C542.173 350.901 542.088 350.01 541.821 349.167C541.554 348.323 541.112 347.546 540.524 346.885C539.935 346.224 539.214 345.696 538.407 345.334L514.379 334.562C511.424 333.22 509.012 330.915 507.538 328.023C506.064 325.132 505.616 321.826 506.267 318.647V318.647C506.716 316.502 507.654 314.491 509.007 312.768C510.36 311.046 512.093 309.659 514.07 308.715C516.047 307.771 518.215 307.296 520.405 307.327C522.596 307.358 524.749 307.894 526.699 308.893L563.151 327.571C565.61 328.831 567.768 330.608 569.477 332.78C571.185 334.951 572.405 337.466 573.051 340.153C573.697 342.84 573.755 345.634 573.221 348.345C572.687 351.056 571.573 353.62 569.956 355.86L551.936 380.83C551.52 381.409 550.972 381.88 550.337 382.205C549.703 382.531 549 382.7 548.287 382.699V382.699Z" fill="#CCCCCC"/>
<Path id="Vector_23" d="M473.274 387.134C472.61 387.134 471.955 386.986 471.355 386.702L443.492 373.591C440.992 372.414 438.776 370.711 436.995 368.599C435.214 366.486 433.911 364.013 433.175 361.35C432.438 358.687 432.286 355.896 432.729 353.169C433.171 350.441 434.198 347.842 435.738 345.548L458.575 311.547C459.797 309.728 461.421 308.216 463.322 307.128C465.223 306.039 467.35 305.404 469.536 305.271C471.723 305.139 473.911 305.513 475.929 306.364C477.948 307.215 479.743 308.52 481.175 310.178C483.285 312.644 484.494 315.753 484.606 318.996C484.718 322.24 483.725 325.425 481.79 328.03L465.99 349.097C465.46 349.805 465.085 350.617 464.89 351.48C464.695 352.343 464.685 353.237 464.861 354.104C465.036 354.971 465.393 355.791 465.908 356.511C466.423 357.23 467.084 357.833 467.848 358.278L481.973 366.518C482.976 367.1 483.715 368.048 484.035 369.164C484.354 370.279 484.23 371.475 483.688 372.5L477.253 384.727C476.872 385.453 476.301 386.061 475.599 386.485C474.898 386.91 474.094 387.134 473.274 387.134V387.134Z" fill="#CCCCCC"/>
<Path id="Vector_24" d="M474.654 268.478C482.41 267.855 488.85 260.106 488.044 252.367C487.953 255.557 489.038 258.669 491.092 261.111C493.146 263.554 496.026 265.156 499.185 265.612C502.743 266.004 506.643 264.928 509.74 266.723C513.17 268.711 514.268 273.539 517.841 275.256C521.294 276.915 525.679 274.652 527.385 271.222C529.09 267.793 528.672 263.672 527.541 260.012C525.929 254.793 522.994 250.08 519.02 246.331C515.047 242.582 510.171 239.926 504.867 238.619C499.563 237.313 494.011 237.402 488.751 238.877C483.492 240.352 478.703 243.163 474.852 247.037C471.59 250.318 469.001 254.499 468.581 259.106C468.161 263.712 470.298 268.711 474.435 270.78L474.654 268.478Z" fill="#2F2E41"/>
</G>
</G>
<Defs>
<ClipPath id="clip0">
<Rect width="695.962" height="624.846" fill="white"/>
</ClipPath>
</Defs>
</Svg>

    
    )
}

export default StatsImaGe