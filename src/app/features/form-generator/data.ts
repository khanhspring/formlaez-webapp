import { Form } from "../../models/form";

export const FORM_LAYOUT: Form = {
  id: 1,
  code: "f",
  title: "Hợp đồng lao động vô thời hạn",
  coverType: 'Color',
  coverColor: 'bg-gradient-nepal',
  pages: [
    {
      id: 1,
      code: "p1",
      title: "Page 1",
      sections: [
        {
          code: "Q5_ZTQfTmf6zf-LnrIYJQ",
          type: "Single",
          variableName: "x_JjMwnF6tvEmKDaVHd_C",
          fields: [
            {
              code: "ZPyAi1vvsE3RsI9CwEHLV",
              type: "InputText",
              variableName: "94jtt",
              title: "Input text",
              placeholder: "Input text",
              required: true,
            },
          ],
        },
        {
          code: "BvCHz8NVS7DT5SAEaanEA",
          type: "Single",
          variableName: "JyAomy8UVhKm85xvPxUMa",
          fields: [
            {
              code: "ZW7XD2qbgldizIaqWFs6c",
              type: "LongText",
              variableName: "sp-hy",
              title: "Long text",
              placeholder: "Long text",
              required: true,
            },
          ],
        },
        {
          code: "F5QCjJmMsJS4MMFOzoshL",
          type: "Single",
          variableName: "-rbWu-_gens5_X1n_BOzQ",
          fields: [
            {
              code: "nieBcARqGrDI_Hd-sYJW1",
              type: "Email",
              variableName: "beund",
              title: "Email",
              placeholder: "email@example.com",
              required: true,
              acceptedDomains: "gmail.com, formlaez.com.vn",
            },
          ],
        },
        {
          code: "fo2N1-LFjZlQB_DMuskXC",
          type: "Single",
          variableName: "mxl_5Y_IhaYWHvkXbHmGP",
          fields: [
            {
              code: "42sBTmzqCmBiRClqwzvMo",
              type: "InputNumber",
              variableName: "_jawg",
              title: "Input number",
              placeholder: "Input number",
              required: true,
              min: 10,
              max: 100
            },
          ],
        },
        {
          code: "wwVNekLS-fkUHCQGigP8R",
          type: "Single",
          variableName: "yMfzxDETnvPVnnsbQO1nb",
          fields: [
            {
              code: "WdM8hu_h7pbgWBjBg63Hg",
              type: "Datetime",
              variableName: "qvwee",
              title: "Date time picker",
              placeholder: "Date time picker",
              required: true,
              showTime: true,
            },
          ],
        },
        {
          code: "gGLRKmJfgYktN9DExlkCn",
          type: "Single",
          variableName: "8tUcRIMgZyCpam7JvYZ-H",
          fields: [
            {
              code: "P1FHgd34UbCWZbV_N54-s",
              type: "Dropdown",
              variableName: "g-zjh",
              title: "Dropdown",
              placeholder: "Dropdown",
              required: true,
              options: [
                {
                  code: "JnwFSOHqXNoCFMiAEoDgJ",
                  label: "Tailwind lets you conditionally",
                },
                {
                  code: "MzrN0gdK9fsYs1U-4YaRV",
                  label:
                    "This can be useful when you want to remove filters conditionally, such as on hover or at a particular breakpoint.",
                },
                {
                  code: "BiSs7tGzldTJXcxL_KDf4",
                  label: "To learn more, check out the documentation",
                },
                {
                  code: "pVGwmbMGTcW_vP8_5zObh",
                  label:
                    "By default, Tailwind includes a handful of general purpose",
                },
              ],
            },
          ],
        },
        {
          code: "SZ7AvkIgXl5qhvbJiF4EZ",
          type: "Single",
          variableName: "OfEUMk9tGgu12bPmXayJK",
          fields: [
            {
              code: "c2mYlp9f_LkyNtuGdPTnY",
              type: "MultipleChoice",
              variableName: "1twcy",
              title: "Multiple choice",
              placeholder: "Multiple choice",
              required: true,
              multipleSelection: false,
              options: [
                {
                  code: "JnwFSOHqXNoCFMiAEoDgJ",
                  label: "Tailwind lets you conditionally",
                },
                {
                  code: "MzrN0gdK9fsYs1U-4YaRV",
                  label:
                    "This can be useful when you want to remove filters conditionally, such as on hover or at a particular breakpoint.",
                },
                {
                  code: "BiSs7tGzldTJXcxL_KDf4",
                  label: "To learn more, check out the documentation",
                },
                {
                  code: "pVGwmbMGTcW_vP8_5zObh",
                  label:
                    "By default, Tailwind includes a handful of general purpose",
                },
              ],
            },
          ],
        },
        {
          code: "bIMjzGLREF_YwAGi-looM",
          type: "Single",
          variableName: "MXS7X-D8_h7M_U_KOrmom",
          fields: [
            {
              code: "nc4UOJZQHGbs26RkNbIGJ",
              type: "Rating",
              variableName: "yzrzo",
              title: "Rating",
              placeholder: "Rating",
              required: true,
            },
          ],
        },
        {
          code: "7CQgR_kIvVXIjSNQD9k4U",
          type: "Single",
          variableName: "FMSmPRDAq6aquDrC4Xrhe",
          fields: [
            {
              code: "SVLAe7-qmJ87DJMHXUMZw",
              type: "Switch",
              variableName: "ke6mi",
              title: "Switch",
              placeholder: "Switch",
              required: true,
            },
          ],
        },
        {
          code: "AEOnzb-L4YlKTm3rJkHR8",
          type: "Single",
          variableName: "3fvTJtvJcj1zTGArSWthG",
          fields: [
            {
              code: "neiUArj3uz_jDNQkjfB-E",
              type: "OpinionScale",
              variableName: "fbhds",
              title: "Opinion scale",
              placeholder: "Opinion scale",
              required: true,
            },
          ],
        },
        {
          code: "dX78t8XQSo2s8DwKKaQ65",
          type: "Single",
          variableName: "_Reoo2aNp2f8HrFYx9isy",
          fields: [
            {
              code: "qANR7M9RP9xgrqi9z71wd",
              type: "Video",
              variableName: "lffri",
              url: "https://www.youtube.com/embed/-VJ4rkSNHBM",
            },
          ],
        },
        {
          code: "_s1ikN770vtDuwtpwRHm-",
          type: "Single",
          variableName: "udxaBRp-7c92zuZi4HzQV",
          fields: [
            {
              code: "yV9bw3bAmYXu3ZIW_qqI1",
              type: "Image",
              variableName: "6ngdx",
              url: "https://images.unsplash.com/photo-1521113484915-ca8c67d6b06e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&w=1000&q=80",
            },
          ],
        },
        {
          code: "2mWyN8FZADvaEX_rtomjz",
          type: "Single",
          variableName: "1lzenTrQihdzt3cenu98E",
          fields: [
            {
              code: "C0pUtCyyBNoWZbYlNckIZ",
              type: "Line",
              variableName: "ewc6n",
            },
          ],
        },
        {
          code: "Qf85kzH_eU_7IBC_EIrtL",
          type: "Single",
          variableName: "Vs-OHd9k3kLdBe2VG_B9z",
          fields: [
            {
              code: "q7YSHjI3IdYpET-X1o32x",
              type: "Pdf",
              variableName: "igmgz",
              url: "https://www.africau.edu/images/default/sample.pdf",
            },
          ],
        },
        {
          code: "Lp2CBDmmEHbzRu90YTl-4",
          type: "Single",
          variableName: "TfjkBxS-z8Y6khBk_qIwg",
          fields: [
            {
              code: "KwMWLiCdPkNKZpGHMLbMl",
              type: "Text",
              variableName: "wlowy",
              content:
                '<p>It is passed as a parameter to <code>EditorState.push</code>, and denotes the type of change operation that is being performed by transitioning to the new <code>ContentState</code>.</p>\n<p><em>Behind the scenes, this value is used to determine appropriate undo/redo handling, spellcheck behavior, and more. Therefore, while it is possible to provide an arbitrary string value as the </em><code><em>changeType</em></code><em> parameter here, you should avoid doing so.</em></p>\n<p>We highly recommend that you install <a href="http://flowtype.org/">Flow</a> to perform static typechecking on your project. Flow will enforce the use of an appropriate <code>EditorChangeType</code> value.</p>',
            },
          ],
        }
      ],
    },
  ],
};

export const CONTENT_FORM: Form = {
  id: 1,
  code: "f",
  title: "Form 1",
  pages: [
    {
      id: 1,
      code: "p1",
      title: "Page 1",
      sections: [
        {
          code: "ol6hpiZvWpk6HXtIWC5wm",
          type: "Single",
          variableName: "JN6yTmrFCiB-YaKRIDvKi",
          fields: [
            {
              code: "j_owzVC9Qrfkcy7RnJgQn",
              type: "InputText",
              variableName: "oqshp",
              title: "Input text",
              placeholder: "Input text",
              required: true,
            },
          ],
        },
        {
          code: "dX78t8XQSo2s8DwKKaQ65",
          type: "Single",
          variableName: "_Reoo2aNp2f8HrFYx9isy",
          fields: [
            {
              code: "qANR7M9RP9xgrqi9z71wd",
              type: "Video",
              variableName: "lffri",
              url: "https://www.youtube.com/embed/-VJ4rkSNHBM",
            },
          ],
        },
        {
          code: "_s1ikN770vtDuwtpwRHm-",
          type: "Single",
          variableName: "udxaBRp-7c92zuZi4HzQV",
          fields: [
            {
              code: "yV9bw3bAmYXu3ZIW_qqI1",
              type: "Image",
              variableName: "6ngdx",
              url: "https://images.unsplash.com/photo-1521113484915-ca8c67d6b06e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&w=1000&q=80",
            },
          ],
        },
        {
          code: "2mWyN8FZADvaEX_rtomjz",
          type: "Single",
          variableName: "1lzenTrQihdzt3cenu98E",
          fields: [
            {
              code: "C0pUtCyyBNoWZbYlNckIZ",
              type: "Line",
              variableName: "ewc6n",
            },
          ],
        },
        {
          code: "Qf85kzH_eU_7IBC_EIrtL",
          type: "Single",
          variableName: "Vs-OHd9k3kLdBe2VG_B9z",
          fields: [
            {
              code: "q7YSHjI3IdYpET-X1o32x",
              type: "Pdf",
              variableName: "igmgz",
              url: "https://www.africau.edu/images/default/sample.pdf",
            },
          ],
        },
        {
          code: "Lp2CBDmmEHbzRu90YTl-4",
          type: "Single",
          variableName: "TfjkBxS-z8Y6khBk_qIwg",
          fields: [
            {
              code: "KwMWLiCdPkNKZpGHMLbMl",
              type: "Text",
              variableName: "wlowy",
              content:
                '<p>It is passed as a parameter to <code>EditorState.push</code>, and denotes the type of change operation that is being performed by transitioning to the new <code>ContentState</code>.</p>\n<p><em>Behind the scenes, this value is used to determine appropriate undo/redo handling, spellcheck behavior, and more. Therefore, while it is possible to provide an arbitrary string value as the </em><code><em>changeType</em></code><em> parameter here, you should avoid doing so.</em></p>\n<p>We highly recommend that you install <a href="http://flowtype.org/">Flow</a> to perform static typechecking on your project. Flow will enforce the use of an appropriate <code>EditorChangeType</code> value.</p>',
            },
          ],
        }
      ],
    },
  ],
};

const HTML_FORM: Form = {
  id: 1,
  code: "f",
  title: "Form 1",
  pages: [
    {
      id: 1,
      code: "p1",
      title: "Page 1",
      sections: [
        {
          code: "Lp2CBDmmEHbzRu90YTl-4",
          type: "Single",
          variableName: "TfjkBxS-z8Y6khBk_qIwg",
          fields: [
            {
              code: "KwMWLiCdPkNKZpGHMLbMl",
              type: "Text",
              variableName: "wlowy",
              content:
                '<p>It is passed as a parameter to <code>EditorState.push</code>, and denotes the type of change operation that is being performed by transitioning to the new <code>ContentState</code>.</p>\n<p><em>Behind the scenes, this value is used to determine appropriate undo/redo handling, spellcheck behavior, and more. Therefore, while it is possible to provide an arbitrary string value as the </em><code><em>changeType</em></code><em> parameter here, you should avoid doing so.</em></p>\n<p>We highly recommend that you install <a href="http://flowtype.org/">Flow</a> to perform static typechecking on your project. Flow will enforce the use of an appropriate <code>EditorChangeType</code> value.</p>',
            },
          ],
        },
      ],
    },
  ],
};
