import React, { useState, useEffect } from "react";
import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import prisma from "../lib/prisma";
import styles from "../styles/Home.module.scss";
import buttonStyles from "../styles/Button.module.scss";
import checkboxStyles from "../styles/Checkbox.module.scss";

enum Role {
	ADMIN = "ADMIN",
	USER = "USER",
	DEVELOPER = "DEVELOPER",
	DESIGNER = "DESIGNER",
	PROJECT_MANAGER = "PROJECT_MANAGER",
}

export type ProfileProps = {
	id: string;
	image: string;
	bio: string;
	role: Role;
	userId: string;
};

export type UserProps = {
	id: string;
	email: string;
	name: string;
	profile: ProfileProps | null;
};

export type SubtaskProps = {
	id: string;
	title: string;
	isCompleted: boolean;
	taskId: string;
};

export type TaskProps = {
	id: string;
	title: string;
	description: string;
	status: string;
	columnId: string;
	subTasks: SubtaskProps[];
};

export type ColumnProps = {
	id: string;
	name: string;
	tasks: TaskProps[];
	boardId: string;
};

export type BoardProps = {
	id: string;
	name: string;
	columns: ColumnProps[];
};

const Home = (users: UserProps[], boards: BoardProps[]) => {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!loading) {
			console.log(users);
			console.log(boards);
		}

		setLoading(true);
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Kanban Task Manager</title>
				<meta name="description" content="Kanban Task Manager" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className="text-heading5">
					Welcome to the kanban task manager
				</h1>
				<button className={buttonStyles.button}>Click me!</button>
				<button className={buttonStyles.primary}>Click me!</button>
				<button className={buttonStyles.secondary}>Click me!</button>
				<button className={buttonStyles.danger}>Click me!</button>
				<div className={checkboxStyles.labelContainer}>
					<label className={checkboxStyles.container}>
						<input
							className={checkboxStyles.checkboxInput}
							type="checkbox"
						/>
						<span className={checkboxStyles.checkmark}></span>
						Testing Label
					</label>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className={styles.logo}>
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const users = await prisma.user.findMany({
			include: { profile: true },
		});

		const boards = await prisma.board.findMany({
			include: { columns: true },
		});

		return {
			props: { users, boards },
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export default Home;
