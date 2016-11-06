/*
 * Copyright (c) 2014, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ErrorListener = require("../../lib/antlr4-js-runtime/error/ErrorListener").ErrorListener;
var loggerContext = "AceErrorListener";

function AceErrorListener(editor) {
    ErrorListener.call(this);
    this.editor = editor;
    return this;
}
AceErrorListener.prototype = Object.create(ErrorListener.prototype);
AceErrorListener.prototype.constructor = AceErrorListener;

AceErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
    if (this.editor.realTimeValidation)
        this.editor.state.syntaxErrorList.push({
            row: line - 1,
            column: column,
            text: msg,
            type: "error"
        });
    if (SiddhiEditor.debug) {
        console.warn(loggerContext + ":" + "syntaxError" + "->");
        console.error("  Error line " + line + ":" + column + " " + msg, " recognizer:", recognizer, " offendingSymbol:", offendingSymbol, " e:", e);
    }

};

exports.AceErrorListener = AceErrorListener;