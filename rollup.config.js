import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      postcss({
        config: {
          path: './postcss.config.cjs'
        },
        plugins: [
          tailwindcss('./tailwind.config.ts'),
          autoprefixer()
        ],
        extract: 'dist/globals.css',
        minimize: true,
        inject: false,
        modules: false,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        declaration: true,
        declarationDir: 'dist',
        skipLibCheck: true
      }),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      })
    ],
    external: ['react', 'react-dom']
  },
  {
    input: 'src/index.tsx',
    output: [{ 
      file: 'dist/index.d.ts', 
      format: 'es' 
    }],
    plugins: [
      dts({
        compilerOptions: {
          declarationDir: 'dist',
          rootDir: 'src'
        },
        respectExternal: true
      })
    ],
    external: [
      /\.css$/,
      'react',
      'react-dom',
      'clsx',
      'class-variance-authority',
    ]
  }
];
