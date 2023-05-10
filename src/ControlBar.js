import React, { useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import "./features/styles.css"

export const ControlBar = () => {
    return (
        <div id="header" class="titlebar">
            <div class="draggable">
                <div class="controls">
                    <span class="button close"></span>
                    <span class="button minimize"></span>
                    <span class="button maximize"></span>
                </div>
                <span class="title">
                    <script>document.write(document.title)</script>
                </span>
            </div>
        </div>
    )
}