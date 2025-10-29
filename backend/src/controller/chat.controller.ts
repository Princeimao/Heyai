import { Request, Response } from "express";
import { prisma } from "../config/prisma.client";

export const getConversation = async (req: Request, res: Response) => {
  try {
    const { executionId } = req.params;
    const id = req.user?.id;

    const execution = await prisma.execution.findFirst({
      where: {
        id: executionId,
        userId: id,
      },
    });

    if (!execution) {
      res.status(400).json({
        success: false,
        message: "Invalid Execution",
      });
      return;
    }

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: execution.externalId,
      },
      include: {
        message: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Conversation message get successfully",
      conversation: {
        message: conversation?.message,
        title: conversation?.title,
      },
    });
  } catch (error) {
    console.log("something went wrong while getting conversation", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting conversation",
    });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const { executionId } = req.params;
    const userId = req.user?.id;

    const execution = await prisma.execution.findFirst({
      where: {
        id: executionId,
        userId: userId,
      },
    });

    if (!execution) {
      res.status(400).json({
        success: false,
        message: "Execution not found",
      });
      return;
    }

    await prisma.conversation.delete({
      where: {
        id: execution.externalId,
      },
    });

    await prisma.execution.deleteMany({
      where: {
        id: executionId,
      },
    });

    res.status(200).json({
      success: false,
      message: "Execution and related conversation deleted successfully",
    });
  } catch (error) {
    console.log("something went wrong while getting conversation", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting conversation",
    });
  }
};
